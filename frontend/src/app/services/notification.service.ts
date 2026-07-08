import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';
import { AppNotification } from '../models/notification.model';

const STORAGE_KEY = 'hh_notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  private ensureLoaded(): Observable<AppNotification[]> {
    if (this.loaded) return of(this.notificationsSubject.value);
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as AppNotification[];
      this.notificationsSubject.next(parsed);
      this.loaded = true;
      return of(parsed);
    }
    return this.http.get<AppNotification[]>('assets/data/notifications.json').pipe(
      delay(300),
      tap(data => {
        this.notificationsSubject.next(data);
        this.persist(data);
        this.loaded = true;
      })
    );
  }

  private persist(data: AppNotification[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  getForAudience(employeeId: string): Observable<AppNotification[]> {
    return this.ensureLoaded().pipe(
      map(list =>
        list
          .filter(n => n.audience === 'all' || n.audience === employeeId)
          .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      )
    );
  }

  getAll(): Observable<AppNotification[]> {
    return this.ensureLoaded();
  }

  markAsRead(id: string): Observable<void> {
    return this.ensureLoaded().pipe(
      delay(150),
      map(list => {
        const updated = list.map(n => (n.id === id ? { ...n, read: true } : n));
        this.notificationsSubject.next(updated);
        this.persist(updated);
      })
    );
  }

  /** Admin broadcast: send a notification to all employees or a single one. */
  send(title: string, message: string, audience: string): Observable<AppNotification> {
    return this.ensureLoaded().pipe(
      delay(300),
      map(list => {
        const notification: AppNotification = {
          id: 'not' + Date.now(),
          title,
          message,
          audience,
          createdOn: new Date().toISOString(),
          read: false
        };
        const updated = [notification, ...list];
        this.notificationsSubject.next(updated);
        this.persist(updated);
        return notification;
      })
    );
  }
}
