import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent implements OnInit {
  activities: Activity[] = [];
  selectedActivityId = '';
  qrDataUrl = '';
  generating = false;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAll().subscribe(activities => {
      this.activities = activities;
      if (activities.length) {
        this.selectedActivityId = activities[0].id;
        this.generate();
      }
    });
  }

  get checkinCode(): string {
    return this.selectedActivityId ? 'CHECKIN-' + this.selectedActivityId.toUpperCase() : '';
  }

  async generate(): Promise<void> {
    if (!this.selectedActivityId) return;
    this.generating = true;
    try {
      this.qrDataUrl = await QRCode.toDataURL(this.checkinCode, { width: 260, margin: 1 });
    } finally {
      this.generating = false;
    }
  }

  print(): void {
    window.print();
  }
}
