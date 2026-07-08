import { Component } from '@angular/core';
import { SidebarLink } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html'
})
export class EmployeeLayoutComponent {
  links: SidebarLink[] = [
    { label: 'Dashboard', path: '/employee/dashboard', icon: 'bi-speedometer2' },
    { label: 'Activities', path: '/employee/activity-list', icon: 'bi-clipboard-check' },
    { label: 'My Registrations', path: '/employee/my-registrations', icon: 'bi-journal-text' },
    { label: 'QR Check-In', path: '/employee/qr-checkin', icon: 'bi-qr-code-scan' },
    { label: 'Profile', path: '/employee/profile', icon: 'bi-person-circle' }
  ];
}
