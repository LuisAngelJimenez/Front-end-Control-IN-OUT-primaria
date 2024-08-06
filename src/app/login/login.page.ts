import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loginError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      async (result: string) => {
        if (result !== 'success') {
          this.errorMessage = this.getErrorMessage(result);
          await this.showAlert();
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

  getErrorMessage(result: string): string {
    switch (result) {
      case 'incorrect password':
        return 'La contraseña es incorrecta.';
      case 'incorrect email':
        return 'El correo electrónico es incorrecto.';
      case 'incorrect email and password':
        return 'El correo electrónico y la contraseña son incorrectos.';
      default:
        return 'Error desconocido. Por favor, inténtalo de nuevo.';
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: this.errorMessage,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
