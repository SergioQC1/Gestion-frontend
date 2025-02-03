import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  usuarios: any[] = []; // Array para almacenar los usuarios

  constructor(private usuariosService: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar los usuarios al iniciar el componente
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next:(data) => {
        this.usuarios = data; // Asignar los usuarios obtenidos al array
      },
      error:(error) => {
        console.error('Error al obtener los usuarios', error);
        alert('No tienes permisos para acceder a esta sección');
      }
    });
  }

  abrirFormulario(usuario?: any): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '400px',
      data: usuario ? { ...usuario } : {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente.');
          this.cargarUsuarios();  // Recargar la lista de usuarios
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
          alert('No se pudo eliminar el usuario. Inténtalo nuevamente.');
        }
      });
    }
  }
}
