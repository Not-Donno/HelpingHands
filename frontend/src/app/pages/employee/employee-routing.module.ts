import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './employee-layout.component';
import { EmployeeDashboardComponent } from './dashboard/dashboard.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { MyRegistrationsComponent } from './my-registrations/my-registrations.component';
import { ProfileComponent } from './profile/profile.component';
import { QrCheckinComponent } from './qr-checkin/qr-checkin.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'activity-list', component: ActivityListComponent },
      { path: 'activities/:id', component: ActivityDetailsComponent },
      { path: 'my-registrations', component: MyRegistrationsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'qr-checkin', component: QrCheckinComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
