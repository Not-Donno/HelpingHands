import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map, tap } from 'rxjs';
import { Employee, AuthUser } from '../models/employee.model';

const SESSION_KEY = 'hh_session_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.loadSession());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadSession(): AuthUser | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as AuthUser : null;
  }

  /** Simulates an async POST /auth/login against the mock employees.json */
  login(email: string, password: string): Observable<AuthUser> {
    return this.http.get<Employee[]>('assets/data/employees.json').pipe(
      delay(500), // simulate network latency
      map(employees => {
        const found = employees.find(
          e => e.email.toLowerCase() === email.toLowerCase() && e.password === password
        );
        if (!found) {
          throw new Error('Invalid email or password.');
        }
        const { password: _pw, ...authUser } = found;
        return authUser as AuthUser;
      }),
      tap(user => {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.currentUserSubject.next(null);
  }

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
