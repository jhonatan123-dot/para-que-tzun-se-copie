import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // <--- Importante para los íconos
import { ProductoServices } from '../../servicios/producto-services';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule // <--- Agregar aquí
  ],
  providers: [ProductoServices],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  dataSource = new MatTableDataSource<Producto>([]);
  
  // Los nombres deben coincidir EXACTAMENTE con los 'matColumnDef' del HTML
  displayedColumns = ['id', 'nombre', 'Precio', 'Stock', 'Acciones'];

  private productoServices = inject(ProductoServices);
  private router = inject(Router);

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
        this.dataSource.data = lista;
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }

  eliminar(id: any) {
    this.productoServices.deleteProducto(id)
      .then(result => {
        this.loaddata();
      })
      .catch(error => {
        console.error('Error al eliminar:', error);
      });
  }
}