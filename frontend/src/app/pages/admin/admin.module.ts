import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { ParticipantsComponent } from './participants/participants.component';
import { AdminNotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    ManageActivitiesComponent,
    AddActivityComponent,
    EditActivityComponent,
    ParticipantsComponent,
    AdminNotificationsComponent,
    ReportsComponent,
    QrGeneratorComponent
  ],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
