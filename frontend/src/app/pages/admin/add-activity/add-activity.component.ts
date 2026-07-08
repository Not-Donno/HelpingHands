import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { Ngo } from '../../../models/ngo.model';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  ngos: Ngo[] = [];
  submitting = false;
  errorMessage = '';

  form = {
    title: '',
    ngoId: '',
    category: '',
    description: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    totalSlots: 20,
    registrationCutoffHours: 24
  };

  constructor(private activityService: ActivityService, private router: Router) {}

  ngOnInit(): void {
    this.activityService.getNgos().subscribe(ngos => (this.ngos = ngos));
  }

  onNgoChange(): void {
    const ngo = this.ngos.find(n => n.id === this.form.ngoId);
    if (ngo) this.form.category = ngo.focusArea;
  }

  submit(): void {
    this.errorMessage = '';
    const { title, ngoId, category, description, location, date, startTime, endTime, totalSlots } = this.form;
    if (!title || !ngoId || !category || !description || !location || !date || !startTime || !endTime || !totalSlots) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const ngo = this.ngos.find(n => n.id === ngoId)!;
    this.submitting = true;
    this.activityService
      .create({
        title,
        ngoId,
        ngoName: ngo.name,
        category,
        description,
        location,
        date,
        startTime,
        endTime,
        totalSlots: Number(totalSlots),
        registrationCutoffHours: Number(this.form.registrationCutoffHours)
      })
      .subscribe(() => {
        this.submitting = false;
        this.router.navigate(['/admin/manage-activities']);
      });
  }
}
