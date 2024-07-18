import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;


  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === 'admin@gmail.com' && password === 'admin') {
      this.authenticated = true;
      this.router.navigate(['/tabs/tab1']);
      return true;
    }
    return false;
  }

  logout() {
    this.authenticated = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
