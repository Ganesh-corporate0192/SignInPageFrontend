import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = localStorage.getItem('isLoggedIn');
      this.username = localStorage.getItem('username') || '';

      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}