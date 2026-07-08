import { Component, OnInit } from '@angular/core';
import { ActivityParticipationReport } from '../../../models/report.model';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  loading = true;
  rows: ActivityParticipationReport[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getParticipationReport().subscribe(rows => {
      this.rows = rows;
      this.loading = false;
    });
  }

  exportCsv(): void {
    const header = 'Activity,NGO,Date,Total Slots,Registered,Checked In,Fill Rate %\n';
    const body = this.rows
      .map(r => `${r.title},${r.ngoName},${r.date},${r.totalSlots},${r.registeredSlots},${r.checkedInCount},${r.fillRatePercent}`)
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'service-day-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
