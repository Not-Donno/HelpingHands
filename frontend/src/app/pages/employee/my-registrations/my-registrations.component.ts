import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { Registration } from '../../../models/registration.model';
import { ActivityService } from '../../../services/activity.service';
import { RegistrationService } from '../../../services/registration.service';
import { AuthService } from '../../../services/auth.service';

interface RegistrationRow {
  registration: Registration;
  activity: Activity;
}

@Component({
  selector: 'app-my-registrations',
  templateUrl: './my-registrations.component.html',
  styleUrls: ['./my-registrations.component.css']
})
export class MyRegistrationsComponent implements OnInit {
  loading = true;
  rows: RegistrationRow[] = [];
  showConfirm = false;
  toCancel?: RegistrationRow;

  constructor(
    private activityService: ActivityService,
    private registrationService: RegistrationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    const employeeId = this.auth.currentUser!.id;
    this.registrationService.getForEmployee(employeeId).subscribe(regs => {
      this.activityService.getAll().subscribe(activities => {
        this.rows = regs
          .map(r => ({ registration: r, activity: activities.find(a => a.id === r.activityId)! }))
          .filter(row => !!row.activity)
          .sort((a, b) => new Date(a.activity.date).getTime() - new Date(b.activity.date).getTime());
        this.loading = false;
      });
    });
  }

  askCancel(row: RegistrationRow): void {
    this.toCancel = row;
    this.showConfirm = true;
  }

  confirmCancel(): void {
    if (!this.toCancel) return;
    this.registrationService.cancel(this.toCancel.registration.id).subscribe(() => {
      this.showConfirm = false;
      this.toCancel = undefined;
      this.load();
    });
  }
}
