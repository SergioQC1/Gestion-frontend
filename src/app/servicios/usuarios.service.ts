import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3131/usuarios';
  private rolUrl = 'http://localhost:3131/roles';

  constructor(private http: HttpClient) { }

  //Obtener los roles registrados
  getRoles(): Observable<any[]> {
    const token = localStorage.getItem('token');  // Obtener el token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any[]>(this.rolUrl, { headers });  // Devuelve la lista de roles
  }

  // Método para obtener los usuarios registrados
  getUsuarios(): Observable<any[]> {
    const token = localStorage.getItem('token');  // Obtener el token
    console.log('Token enviado:', token); // Verificar token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any[]>(this.apiUrl, { headers }); // Llama al endpoint y devuelve un Observable con los usuarios
  }

  crearUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token
    console.log('Token enviado:', token); // Verificar token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    console.log('Datos enviados al backend (crearUsuario):', usuario); // Log para depurar
    return this.http.post(this.apiUrl, usuario, { headers });
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token
    console.log('Token enviado:', token); // Verificar token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    console.log('Datos enviados al backend (actualizarUsuario):', usuario); // Log para depurar
    return this.http.put(`${this.apiUrl}/${id}`, usuario, { headers });
  }

  eliminarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  //Para crear nuevos roles
  crearRol(rol: any): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(this.rolUrl, rol, { headers }); // Crear un nuevo rol
  }
}
