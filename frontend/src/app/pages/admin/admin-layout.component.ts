import { Component } from '@angular/core';
import { SidebarLink } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  links: SidebarLink[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'bi-speedometer2' },
    { label: 'Manage Activities', path: '/admin/manage-activities', icon: 'bi-clipboard-check' },
    { label: 'Notifications', path: '/admin/notifications', icon: 'bi-bell' },
    { label: 'Reports', path: '/admin/reports', icon: 'bi-bar-chart-line' },
    { label: 'QR Generator', path: '/admin/qr-generator', icon: 'bi-qr-code' }
  ];
}
