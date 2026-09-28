import { Component, signal, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  listadoProductos = signal<Producto[]>([]);

  private productoServices = inject(ProductoServices);
  private router = inject(Router);

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    this.productoServices.getProductos()
      .then(productos => {
        if (Array.isArray(productos)) {
          this.listadoProductos.set(productos);
        } else if (productos && productos.data) {
          this.listadoProductos.set(productos.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
  }
}