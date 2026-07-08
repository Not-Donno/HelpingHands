import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map, of, switchMap, tap } from 'rxjs';
import { Registration } from '../models/registration.model';
import { ActivityService } from './activity.service';

const STORAGE_KEY = 'hh_registrations';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private registrationsSubject = new BehaviorSubject<Registration[]>([]);
  registrations$ = this.registrationsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient, private activityService: ActivityService) {}

  private ensureLoaded(): Observable<Registration[]> {
    if (this.loaded) return of(this.registrationsSubject.value);
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Registration[];
      this.registrationsSubject.next(parsed);
      this.loaded = true;
      return of(parsed);
    }
    return this.http.get<Registration[]>('assets/data/registrations.json').pipe(
      delay(400),
      tap(data => {
        this.registrationsSubject.next(data);
        this.persist(data);
        this.loaded = true;
      })
    );
  }

  private persist(data: Registration[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  getAll(): Observable<Registration[]> {
    return this.ensureLoaded();
  }

  getForEmployee(employeeId: string): Observable<Registration[]> {
    return this.ensureLoaded().pipe(
      map(list => list.filter(r => r.employeeId === employeeId && r.status === 'confirmed'))
    );
  }

  getForActivity(activityId: string): Observable<Registration[]> {
    return this.ensureLoaded().pipe(
      map(list => list.filter(r => r.activityId === activityId && r.status === 'confirmed'))
    );
  }

  isRegistered(activityId: string, employeeId: string): Observable<boolean> {
    return this.getForEmployee(employeeId).pipe(
      map(list => list.some(r => r.activityId === activityId))
    );
  }

  /** Registers an employee and atomically bumps the activity's slot count. */
  register(activityId: string, employeeId: string): Observable<Registration> {
    return this.ensureLoaded().pipe(
      switchMap(list => {
        const registration: Registration = {
          id: 'reg' + Date.now(),
          activityId,
          employeeId,
          registeredOn: new Date().toISOString(),
          status: 'confirmed',
          checkedIn: false,
          checkInTime: null
        };
        const updated = [...list, registration];
        this.registrationsSubject.next(updated);
        this.persist(updated);
        return this.activityService.adjustSlots(activityId, 1).pipe(map(() => registration));
      })
    );
  }

  /** Cancels a registration and frees up the slot. */
  cancel(registrationId: string): Observable<boolean> {
    return this.ensureLoaded().pipe(
      switchMap(list => {
        const reg = list.find(r => r.id === registrationId);
        if (!reg) return of(false);
        const updated = list.map(r => (r.id === registrationId ? { ...r, status: 'cancelled' as const } : r));
        this.registrationsSubject.next(updated);
        this.persist(updated);
        return this.activityService.adjustSlots(reg.activityId, -1).pipe(map(() => true));
      })
    );
  }

  /** QR check-in: marks a confirmed registration as checked in. */
  checkIn(activityId: string, employeeId: string): Observable<Registration | undefined> {
    return this.ensureLoaded().pipe(
      delay(300),
      map(list => {
        const updated = list.map(r =>
          r.activityId === activityId && r.employeeId === employeeId && r.status === 'confirmed'
            ? { ...r, checkedIn: true, checkInTime: new Date().toISOString() }
            : r
        );
        this.registrationsSubject.next(updated);
        this.persist(updated);
        return updated.find(r => r.activityId === activityId && r.employeeId === employeeId);
      })
    );
  }
}
