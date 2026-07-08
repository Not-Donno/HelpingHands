import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  loading = true;
  allActivities: Activity[] = [];
  filtered: Activity[] = [];

  searchTerm = '';
  categoryFilter = 'all';
  statusFilter = 'all';
  categories: string[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAll().subscribe(activities => {
      this.allActivities = activities.map(a => ({ ...a, status: this.activityService.computeStatus(a) }));
      this.categories = [...new Set(this.allActivities.map(a => a.category))];
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filtered = this.allActivities.filter(a => {
      const matchesTerm = !term || a.title.toLowerCase().includes(term) || a.ngoName.toLowerCase().includes(term);
      const matchesCategory = this.categoryFilter === 'all' || a.category === this.categoryFilter;
      const matchesStatus = this.statusFilter === 'all' || a.status === this.statusFilter;
      return matchesTerm && matchesCategory && matchesStatus;
    });
  }
}
