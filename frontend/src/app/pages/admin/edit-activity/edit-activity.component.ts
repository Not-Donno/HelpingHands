import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { Ngo } from '../../../models/ngo.model';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  ngos: Ngo[] = [];
  loading = true;
  submitting = false;
  errorMessage = '';
  activityId = '';

  form!: Activity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id')!;
    this.activityService.getNgos().subscribe(ngos => (this.ngos = ngos));
    this.activityService.getById(this.activityId).subscribe(activity => {
      if (!activity) {
        this.router.navigate(['/admin/manage-activities']);
        return;
      }
      this.form = { ...activity };
      this.loading = false;
    });
  }

  onNgoChange(): void {
    const ngo = this.ngos.find(n => n.id === this.form.ngoId);
    if (ngo) {
      this.form.ngoName = ngo.name;
    }
  }

  submit(): void {
    this.errorMessage = '';
    if (!this.form.title || !this.form.ngoId || !this.form.location || !this.form.date) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    this.submitting = true;
    this.activityService.update(this.form).subscribe(() => {
      this.submitting = false;
      this.router.navigate(['/admin/manage-activities']);
    });
  }
}
