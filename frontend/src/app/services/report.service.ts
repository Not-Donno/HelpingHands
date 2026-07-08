import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, take } from 'rxjs';
import { ActivityService } from './activity.service';
import { RegistrationService } from './registration.service';
import { ActivityParticipationReport, DashboardSummary } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(
    private activityService: ActivityService,
    private registrationService: RegistrationService
  ) {}

  getParticipationReport(): Observable<ActivityParticipationReport[]> {
    return combineLatest([this.activityService.getAll(), this.registrationService.getAll()]).pipe(
      take(1),
      map(([activities, registrations]) =>
        activities.map(a => {
          const confirmed = registrations.filter(r => r.activityId === a.id && r.status === 'confirmed');
          const checkedIn = confirmed.filter(r => r.checkedIn).length;
          return {
            activityId: a.id,
            title: a.title,
            ngoName: a.ngoName,
            date: a.date,
            totalSlots: a.totalSlots,
            registeredSlots: a.registeredSlots,
            checkedInCount: checkedIn,
            fillRatePercent: a.totalSlots ? Math.round((a.registeredSlots / a.totalSlots) * 100) : 0
          };
        })
      )
    );
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return combineLatest([
      this.activityService.getAll(),
      this.registrationService.getAll(),
      this.activityService.getNgos()
    ]).pipe(
      take(1),
      map(([activities, registrations, ngos]) => {
        const confirmed = registrations.filter(r => r.status === 'confirmed');
        return {
          totalActivities: activities.length,
          openActivities: activities.filter(a => this.activityService.computeStatus(a) === 'open').length,
          totalRegistrations: confirmed.length,
          totalCheckedIn: confirmed.filter(r => r.checkedIn).length,
          totalNgos: ngos.length
        };
      })
    );
  }
}
