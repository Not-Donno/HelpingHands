import { Component, OnInit } from '@angular/core';
import { AppNotification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { Employee } from '../../../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class AdminNotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];
  employees: Employee[] = [];
  loading = true;
  sending = false;

  form = { title: '', message: '', audience: 'all' };

  constructor(private notificationService: NotificationService, private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
    this.http.get<Employee[]>('assets/data/employees.json').subscribe(emps => {
      this.employees = emps.filter(e => e.role === 'employee');
    });
  }

  private load(): void {
    this.loading = true;
    this.notificationService.getAll().subscribe(list => {
      this.notifications = [...list].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      this.loading = false;
    });
  }

  send(): void {
    if (!this.form.title || !this.form.message) return;
    this.sending = true;
    this.notificationService.send(this.form.title, this.form.message, this.form.audience).subscribe(() => {
      this.sending = false;
      this.form = { title: '', message: '', audience: 'all' };
      this.load();
    });
  }
}
