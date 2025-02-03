import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user:any={}; //Información del usuario
  modules: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    //Recuperando información del usuario desde localStorage
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if(storedUser){
      this.user = JSON.parse(storedUser); //Asignando la información del usuario

      // Configuración de los módulos según el rol
      switch (this.user.rol) {
        case 'ADMINISTRADOR':
          this.modules = ['Ajustes', 'Clientes', 'Reportes'];
          break;
        case 'SECRETARIA':
          this.modules = ['Clientes', 'Reportes'];
          break;
        case 'LECTOR':
          this.modules = ['Clientes'];
          break;
        case 'CAJERA':
          this.modules = ['Clientes', 'Reportes'];
          break;
        default:
          this.modules = [];
          break;
      }
    }else {
      this.router.navigate(['/login']); // Redirigir si no hay sesión
    }
  }

  // Lógica para cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
    if(typeof window !== 'undefined'){
      localStorage.removeItem('user');  // Eliminar rol del almacenamiento local
    }
    this.router.navigate(['/login']);  // Redirigir al login
  }

  getIconForModule(module: string): string {
    switch (module) {
      case 'Ajustes':
        return 'settings';
      case 'Clientes':
        return 'people';
      case 'Reportes':
        return 'assessment';
      default:
        return 'dashboard';
    }
  }

  /*Menu opciones (prueba) */
  navigateToOption(module: string, option: string) {
    console.log(`Navegando a ${option} del módulo ${module}`);
    // Ejemplo de navegación (ajusta según tus rutas)
    this.router.navigate([`/${module.toLowerCase()}/${option}`]);
  }

  /*Ruta ajustes */
  navigateTo(route: string) {
    console.log(`Navegando a /${route}`);
    this.router.navigate([`/${route}`]); // Redirige a la ruta seleccionada
  }

}
