import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { RolFormComponent } from '../rol-form/rol-form.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatOption, MatSelect],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{

  usuarioForm: FormGroup;
  rolForm: FormGroup; // Formulario para el nuevo rol
  roles: any[] = []; //Lista de roles disponibles

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data?.nombre || ''],
      apellido: [data?.apellido || ''],
      correo: [data?.correo || ''],
      telefono: [data?.telefono || ''],
      contraseña: [''],
      rol: [data?.rol?.idRol || '']
    });

    this.rolForm = this.fb.group({
      nombre: [''], // Formulario para el nuevo rol
    });
  }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.usuariosService.getRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('Roles disponibles:', roles);  // Verificar roles en consola
    });
  }

  guardarUsuario(): void {
    const usuario = this.usuarioForm.value;

    usuario.rolId = usuario.rol;
    delete usuario.rol;

    if (this.data?.idUsuario) {
      this.usuariosService.actualizarUsuario(this.data.idUsuario, usuario).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.usuariosService.crearUsuario(usuario).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  //ROL
  abrirFormularioRol() {
    const dialogRef = this.dialog.open(RolFormComponent);

    dialogRef.afterClosed().subscribe((nuevoRol) => {
      if (nuevoRol && nuevoRol.nombre) { //Aseguramos que el rol tenga nombre
        this.roles.push(nuevoRol); // Agregar el nuevo rol directamente
      this.roles = [...this.roles]; // Actualizar la referencia para que Angular detecte los cambios
      }
    });
  }

  onCancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo sin realizar cambios
  }

}
