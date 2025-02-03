import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../servicios/usuarios.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './rol-form.component.html',
  styleUrl: './rol-form.component.css'
})
export class RolFormComponent {

  rolForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RolFormComponent>,
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.rolForm = this.fb.group({
      nombre: ['']
    });
  }

  guardarRol() {
    const nuevoRol = this.rolForm.value;

    if (nuevoRol.nombre && nuevoRol.nombre.trim() !== '') {
      this.usuariosService.crearRol(nuevoRol).subscribe({next:() => {
        this.dialogRef.close(nuevoRol); // Cerrar el diálogo y devolver el nuevo rol
      }, error:(error) => {
        alert('Ocurrió un error al crear el rol. Inténtalo de nuevo.');
      }
      });
    } else {
        alert('El nombre del rol no puede estar vacío.');
    }
  }

  onCancelar(): void {
    this.dialogRef.close(null); // Cierra el diálogo sin realizar cambios
  }

}
