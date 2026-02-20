import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  loading = false;
  message = '';
  isLoggedIn = false;

  private platformId = inject(PLATFORM_ID);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }

  onLogin() {
    this.loading = true;
    this.message = '';

    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('isLoggedIn', 'true');

            // Extract username from message like "Welcome Ganesh"
            const username = res.message.replace('Welcome ', '');
            localStorage.setItem('username', username);
          }

          // Redirect to dashboard
          this.router.navigate(['/dashboard']);

        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = "Invalid email or password!";
        console.error(err);
      }
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

    this.isLoggedIn = false;
    this.message = '';
    this.user = { email: '', password: '' };
  }
}