import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    correo: new FormControl(''),
    contraseña: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      correo: this.loginForm.get('correo')?.value,
      contraseña: this.loginForm.get('contraseña')?.value
    };

    console.log('Datos enviados:', loginData); //Verificar datos enviados

    this.http.post('http://localhost:3131/login', loginData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response: any) => {
      console.log('Respuesta del servidor:', response); //Verificar respuesta

      if (response.role) {
        localStorage.setItem('token', response.token);  // Guardar el token
        //Guardando información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({
          nombre: response.nombre,
          apellido: response.apellido,
          correo: response.correo,
          rol: response.role
        }));
        this.router.navigate(['/home']);
      }
    },
    error: (error) => {
      console.error("Error de autenticación: ", error);
      alert("Error en el inicio de sesión. Verifica tus credenciales.");
    }
  });
  }
}
