// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
    // Agrega más usuarios falsos si es necesario
  ];

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      // Guarda el estado de autenticación (por ejemplo, en el almacenamiento local)
      return true;
    }
    return false;
  }

  logout(): void {
    // Elimina el estado de autenticación
  }

  isAuthenticated(): boolean {
    // Verifica si el usuario está autenticado
    // (por ejemplo, consultando el estado guardado)
    return false;
  }
}
