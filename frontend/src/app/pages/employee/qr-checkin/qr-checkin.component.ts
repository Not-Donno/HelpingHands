import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';
import { RegistrationService } from '../../../services/registration.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-qr-checkin',
  templateUrl: './qr-checkin.component.html',
  styleUrls: ['./qr-checkin.component.css']
})
export class QrCheckinComponent implements OnInit {
  activities: Activity[] = [];
  selectedActivityId = '';
  scanCode = '';
  message = '';
  success = false;
  processing = false;

  constructor(
    private activityService: ActivityService,
    private registrationService: RegistrationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const employeeId = this.auth.currentUser!.id;
    this.registrationService.getForEmployee(employeeId).subscribe(regs => {
      this.activityService.getAll().subscribe(activities => {
        const ids = new Set(regs.map(r => r.activityId));
        this.activities = activities.filter(a => ids.has(a.id));
        if (this.activities.length) this.selectedActivityId = this.activities[0].id;
      });
    });
  }

  /** Simulates scanning a QR code: the "code" is simply the activity id printed on the poster. */
  submitCheckIn(): void {
    if (!this.selectedActivityId) return;
    const expectedCode = 'CHECKIN-' + this.selectedActivityId.toUpperCase();
    this.processing = true;
    this.message = '';

    if (this.scanCode.trim().toUpperCase() !== expectedCode) {
      this.processing = false;
      this.success = false;
      this.message = 'That QR code does not match the selected activity. Please try again.';
      return;
    }

    this.registrationService.checkIn(this.selectedActivityId, this.auth.currentUser!.id).subscribe(reg => {
      this.processing = false;
      if (reg) {
        this.success = true;
        this.message = 'Check-in successful! Enjoy your Service Day activity.';
      } else {
        this.success = false;
        this.message = 'We could not find a confirmed registration for this activity.';
      }
    });
  }

  get expectedCodeHint(): string {
    return this.selectedActivityId ? 'CHECKIN-' + this.selectedActivityId.toUpperCase() : '';
  }
}
