import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from './apis.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private currentUser: any = null;

  constructor(private router: Router, private api: ApisService) {}

  getUser(): Observable<any> {
    return this.api.getUser();
  }

  login(username: string, password: string): Observable<string> {
    return this.getUser().pipe(
      map((data: any) => {
        if (data) {
          let emailFound = false;
          let passwordFound = false;

          for (let user of data) {
            if (user.email === username) {
              emailFound = true;
              if (user.curp === password) {
                this.authenticated = true;
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

                //console.log('Usuario autenticado. Rol:', user.rol);

                switch (user.rol) {
                  case 'tutor':
                    this.router.navigate(['/tabs/tab1']);
                    break;
                  case 'administrador':
                  case 'encargado':
                    this.router.navigate(['/tabs/adminprofile']);
                    break;
                  default:
                    this.router.navigate(['/tabs']);
                }

                return 'success';
              } else {
                passwordFound = true;
              }
            }
          }

          if (emailFound && !passwordFound) {
            return 'incorrect password';
          } else if (!emailFound) {
            return 'incorrect email';
          }
        }
        return 'incorrect email and password';
      })
    );
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    //console.log('Recuperado currentUser en getCurrentUser:', this.currentUser);
    return this.currentUser;
  }

  logout() {
    this.authenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
