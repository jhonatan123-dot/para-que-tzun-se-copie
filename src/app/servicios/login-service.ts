import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = 'http://10.5.243.245:8000/api/';

  login(email: string, password: string): Promise<any> {
    return fetch(this.apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Credenciales Incorrectas');
      }
      return data;
    });
  }

  logout(token: string): Promise<any> {
    return fetch(this.apiUrl + 'logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` // Corregido: Bearer
      }
    }).then(async response => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cerrar sesión');
      }
      return data;
    });
  }
}