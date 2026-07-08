import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ActivityCardComponent,
    StatsCardComponent,
    SpinnerComponent,
    ConfirmationDialogComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ActivityCardComponent,
    StatsCardComponent,
    SpinnerComponent,
    ConfirmationDialogComponent,
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {}
