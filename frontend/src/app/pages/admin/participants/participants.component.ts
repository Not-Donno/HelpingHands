import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../../models/activity.model';
import { Registration } from '../../../models/registration.model';
import { Employee } from '../../../models/employee.model';
import { ActivityService } from '../../../services/activity.service';
import { RegistrationService } from '../../../services/registration.service';
import { HttpClient } from '@angular/common/http';

interface ParticipantRow {
  registration: Registration;
  employeeName: string;
  employeeEmail: string;
  department: string;
}

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  loading = true;
  activity?: Activity;
  rows: ParticipantRow[] = [];

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private registrationService: RegistrationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.activityService.getById(id).subscribe(activity => {
      this.activity = activity;
      this.registrationService.getForActivity(id).subscribe(regs => {
        this.http.get<Employee[]>('assets/data/employees.json').subscribe(employees => {
          this.rows = regs.map(r => {
            const emp = employees.find(e => e.id === r.employeeId);
            return {
              registration: r,
              employeeName: emp?.name || 'Unknown',
              employeeEmail: emp?.email || '-',
              department: emp?.department || '-'
            };
          });
          this.loading = false;
        });
      });
    });
  }
}
