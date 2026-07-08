import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { ParticipantsComponent } from './participants/participants.component';
import { AdminNotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'manage-activities', component: ManageActivitiesComponent },
      { path: 'add-activity', component: AddActivityComponent },
      { path: 'edit-activity/:id', component: EditActivityComponent },
      { path: 'participants/:id', component: ParticipantsComponent },
      { path: 'notifications', component: AdminNotificationsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'qr-generator', component: QrGeneratorComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
