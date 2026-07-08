import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../../models/employee.model';
import { AuthService } from '../../../services/auth.service';
import { RegistrationService } from '../../../services/registration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null;
  totalRegistrations = 0;
  totalCheckedIn = 0;

  constructor(private auth: AuthService, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.registrationService.getForEmployee(this.user.id).subscribe(regs => {
        this.totalRegistrations = regs.length;
        this.totalCheckedIn = regs.filter(r => r.checkedIn).length;
      });
    }
  }
}
