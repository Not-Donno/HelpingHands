import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '../../../models/report.model';
import { ReportService } from '../../../services/report.service';
import { ActivityService } from '../../../services/activity.service';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  loading = true;
  summary?: DashboardSummary;
  recentActivities: Activity[] = [];

  constructor(private reportService: ReportService, private activityService: ActivityService) {}

  ngOnInit(): void {
    this.reportService.getDashboardSummary().subscribe(summary => {
      this.summary = summary;
      this.activityService.getAll().subscribe(activities => {
        this.recentActivities = [...activities]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        this.loading = false;
      });
    });
  }
}
