import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
})

export class ProductoServices {
    private apiUrl: string = 'http://10.5.243.245:8000/api/';

  getProductos(): Promise<any> {
    // 1. Recuperamos el token guardado en el navegador tras el login
    const token = localStorage.getItem('token');

    return fetch(this.apiUrl + 'producto', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` // <--- Enviamos el token a Laravel
      }
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los productos');
      }
      return data;
    });
  }
}
