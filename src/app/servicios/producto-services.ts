import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
})

export class ProductoServices {
    private apiUrl: string = 'http://10.5.243.245:8000/api/';

    getProductos(): Promise<any> {

        const token = localStorage.getItem('token');

        return fetch(this.apiUrl + 'producto', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener los productos');
            }
            return data;
        });
    }


    deleteProducto(id: any, token?: any): Promise<any> {
        const currentToken = token || localStorage.getItem('token');

        return fetch(`${this.apiUrl}producto/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error al eliminar el producto');
            }
            return data;
        });
    }
}
