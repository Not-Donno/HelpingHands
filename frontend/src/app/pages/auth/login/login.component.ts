import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.auth.login(this.email, this.password).subscribe({
      next: user => {
        this.loading = false;
        this.router.navigate([user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.message || 'Login failed. Please try again.';
      }
    });
  }

  fillDemo(role: 'employee' | 'admin'): void {
    if (role === 'employee') {
      this.email = 'aarav.sharma@company.com';
      this.password = 'password123';
    } else {
      this.email = 'sita.adhikari@company.com';
      this.password = 'admin123';
    }
  }
}
