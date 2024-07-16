import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string='';
  password: string='';
  loginError: boolean = false;

  constructor(private authService: AuthService) { }

  login() {
    this.loginError = !this.authService.login(this.email, this.password);
  }
}
