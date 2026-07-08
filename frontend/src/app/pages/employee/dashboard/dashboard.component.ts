import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { Registration } from '../../../models/registration.model';
import { ActivityService } from '../../../services/activity.service';
import { RegistrationService } from '../../../services/registration.service';
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  loading = true;
  upcomingActivities: Activity[] = [];
  myRegistrationsCount = 0;
  myCheckedInCount = 0;
  recommendedActivities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private registrationService: RegistrationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const employeeId = this.auth.currentUser!.id;
    forkJoin({
      activities: this.activityService.getAll(),
      registrations: this.registrationService.getForEmployee(employeeId)
    }).subscribe(({ activities, registrations }) => {
      this.myRegistrationsCount = registrations.length;
      this.myCheckedInCount = registrations.filter(r => r.checkedIn).length;

      const registeredIds = new Set(registrations.map(r => r.activityId));
      const today = new Date();

      this.upcomingActivities = activities
        .filter(a => registeredIds.has(a.id) && new Date(a.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      this.recommendedActivities = activities
        .filter(a => !registeredIds.has(a.id) && this.activityService.computeStatus(a) === 'open')
        .slice(0, 3);

      this.loading = false;
    });
  }
}
