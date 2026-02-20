import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './Dashboard/dashboard.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];