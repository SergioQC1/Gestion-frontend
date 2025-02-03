import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      console.log('Usuario autenticado:', user);

      // Si el usuario tiene un rol válido, permite el acceso
      if (user.rol) {
        return true;
      }
    }

    // Si no hay usuario o no tiene un rol válido, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
