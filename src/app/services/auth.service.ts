import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:5072/api/auth/register';
  private loginUrl = 'http://localhost:5072/api/auth/login';
  
  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(this.apiUrl, {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }

  login(user: any) {
    return this.http.post(this.loginUrl, {
      email: user.email,
      password: user.password
    });
  }
}