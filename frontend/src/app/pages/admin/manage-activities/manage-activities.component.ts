import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit {
  loading = true;
  activities: Activity[] = [];
  showConfirm = false;
  toDelete?: Activity;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.activityService.getAll().subscribe(activities => {
      this.activities = activities.map(a => ({ ...a, status: this.activityService.computeStatus(a) }));
      this.loading = false;
    });
  }

  askDelete(a: Activity): void {
    this.toDelete = a;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (!this.toDelete) return;
    this.activityService.delete(this.toDelete.id).subscribe(() => {
      this.showConfirm = false;
      this.toDelete = undefined;
      this.load();
    });
  }
}
