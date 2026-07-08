import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';
import { RegistrationService } from '../../../services/registration.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  loading = true;
  activity?: Activity;
  isRegistered = false;
  processing = false;
  feedback = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private registrationService: RegistrationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.load(id);
  }

  private load(id: string): void {
    this.loading = true;
    this.activityService.getById(id).subscribe(activity => {
      if (!activity) {
        this.router.navigate(['/employee/activity-list']);
        return;
      }
      this.activity = { ...activity, status: this.activityService.computeStatus(activity) };
      this.registrationService.isRegistered(id, this.auth.currentUser!.id).subscribe(registered => {
        this.isRegistered = registered;
        this.loading = false;
      });
    });
  }

  get canRegister(): boolean {
    return !!this.activity && !this.isRegistered && this.activityService.isRegistrationAllowed(this.activity);
  }

  register(): void {
    if (!this.activity) return;
    this.processing = true;
    this.feedback = '';
    this.registrationService.register(this.activity.id, this.auth.currentUser!.id).subscribe({
      next: () => {
        this.feedback = 'You are successfully registered for this activity!';
        this.processing = false;
        this.load(this.activity!.id);
      },
      error: () => {
        this.feedback = 'Something went wrong. Please try again.';
        this.processing = false;
      }
    });
  }
}
