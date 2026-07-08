import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeLayoutComponent } from './employee-layout.component';
import { EmployeeDashboardComponent } from './dashboard/dashboard.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { MyRegistrationsComponent } from './my-registrations/my-registrations.component';
import { ProfileComponent } from './profile/profile.component';
import { QrCheckinComponent } from './qr-checkin/qr-checkin.component';

@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    EmployeeDashboardComponent,
    ActivityListComponent,
    ActivityDetailsComponent,
    MyRegistrationsComponent,
    ProfileComponent,
    QrCheckinComponent
  ],
  imports: [SharedModule, EmployeeRoutingModule]
})
export class EmployeeModule {}
