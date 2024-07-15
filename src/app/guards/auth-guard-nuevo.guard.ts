
// login.guard.ts (nuevo archivo)
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // El usuario está autenticado, redirige a la página de inicio
      this.router.navigate(['/home']);
      return false;
    } else {
      // El usuario no está autenticado, permite el acceso a la página de inicio de sesión
      return true;
    }
  }
}
