import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';
import { Activity, ActivityStatus } from '../models/activity.model';
import { Ngo } from '../models/ngo.model';

const STORAGE_KEY = 'hh_activities';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  /** In-memory cache acting as our "database" for the session, seeded from JSON */
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  activities$ = this.activitiesSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  /** Loads mock JSON once, then serves from local state (simulating a live backend). */
  private ensureLoaded(): Observable<Activity[]> {
    if (this.loaded) {
      return of(this.activitiesSubject.value);
    }
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Activity[];
      this.activitiesSubject.next(parsed);
      this.loaded = true;
      return of(parsed);
    }
    return this.http.get<Activity[]>('assets/data/activities.json').pipe(
      delay(400),
      tap(data => {
        this.activitiesSubject.next(data);
        this.persist(data);
        this.loaded = true;
      })
    );
  }

  private persist(data: Activity[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  getAll(): Observable<Activity[]> {
    return this.ensureLoaded();
  }

  getById(id: string): Observable<Activity | undefined> {
    return this.ensureLoaded().pipe(map(list => list.find(a => a.id === id)));
  }

  getNgos(): Observable<Ngo[]> {
    return this.http.get<Ngo[]>('assets/data/ngos.json').pipe(delay(300));
  }

  /** Recomputes status from slot counts + registration cutoff logic. */
  computeStatus(activity: Activity): ActivityStatus {
    if (activity.registeredSlots >= activity.totalSlots) return 'full';

    const activityStart = new Date(`${activity.date}T${activity.startTime}:00`);
    const cutoff = new Date(activityStart.getTime() - activity.registrationCutoffHours * 60 * 60 * 1000);
    if (new Date() > cutoff) return 'closed';

    return 'open';
  }

  isRegistrationAllowed(activity: Activity): boolean {
    return this.computeStatus(activity) === 'open';
  }

  /** Simulates PATCH: increments/decrements registered slot count without a page reload. */
  adjustSlots(activityId: string, delta: number): Observable<Activity> {
    return this.ensureLoaded().pipe(
      delay(300),
      map(list => {
        const updated = list.map(a => {
          if (a.id !== activityId) return a;
          const registeredSlots = Math.max(0, Math.min(a.totalSlots, a.registeredSlots + delta));
          const next = { ...a, registeredSlots };
          next.status = this.computeStatus(next);
          return next;
        });
        this.activitiesSubject.next(updated);
        this.persist(updated);
        return updated.find(a => a.id === activityId)!;
      })
    );
  }

  create(activity: Omit<Activity, 'id' | 'registeredSlots' | 'status'>): Observable<Activity> {
    return this.ensureLoaded().pipe(
      delay(400),
      map(list => {
        const newActivity: Activity = {
          ...activity,
          id: 'act' + (Date.now()),
          registeredSlots: 0,
          status: 'open'
        };
        const updated = [...list, newActivity];
        this.activitiesSubject.next(updated);
        this.persist(updated);
        return newActivity;
      })
    );
  }

  update(activity: Activity): Observable<Activity> {
    return this.ensureLoaded().pipe(
      delay(400),
      map(list => {
        const updated = list.map(a => (a.id === activity.id ? { ...activity, status: this.computeStatus(activity) } : a));
        this.activitiesSubject.next(updated);
        this.persist(updated);
        return updated.find(a => a.id === activity.id)!;
      })
    );
  }

  delete(id: string): Observable<boolean> {
    return this.ensureLoaded().pipe(
      delay(300),
      map(list => {
        const updated = list.filter(a => a.id !== id);
        this.activitiesSubject.next(updated);
        this.persist(updated);
        return true;
      })
    );
  }

  resetMockData(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.loaded = false;
  }
}
