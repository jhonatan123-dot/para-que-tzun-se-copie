import { Component, signal, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-index',
  imports: [CommonModule, MatTableModule],
  providers: [ProductoServices],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  listadoProductos = signal<Producto[]>([]);

  private productoServices = inject(ProductoServices);
  private router = inject(Router);

  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns = ['id', 'nombre', 'Precio', 'Stock'];

  
  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    this.productoServices.getProductos()
      .then(productos => {
        let lista: Producto[] = [];

        if (Array.isArray(productos)) {
          lista = productos;
        } else if (productos && productos.data) {
          lista = productos.data;
        }

        this.listadoProductos.set(lista);
        
        this.dataSource.data = lista; 
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
  }
}