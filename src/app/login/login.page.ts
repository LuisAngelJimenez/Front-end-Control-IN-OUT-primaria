/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
 */
// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la redirección
import { AuthService } from '../services/auth.service'; // Importa tu servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  email: string = ''; // Inicializa la propiedad 'email'
  password: string = ''; // Inicializa la propiedad 'password'

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Llama al método de inicio de sesión del servicio de autenticación
    const isAuthenticated = this.authService.login(this.email, this.password);
    if (isAuthenticated) {
      // Redirige a la página de inicio si el inicio de sesión es exitoso
      this.router.navigate(['home']);
      console.log('Inicio de sesion exitoso') // Cambia '/home' por la ruta real de tu página de inicio
    } else {
      console.log('Error no se pudo iniciar sesion vuelve a intentarlo')
      // Muestra un mensaje de error o realiza alguna acción en caso de inicio de sesión fallido
    }
  }
}

