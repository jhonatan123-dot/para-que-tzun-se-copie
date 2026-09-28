import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../servicios/login-service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatToolbarModule ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  token: string | null = null;
  loginService = inject(LoginService)
  

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  private router = inject(Router);

  logout(event: Event) {
    event.preventDefault();

    const currentToken = localStorage.getItem('token');

    if (currentToken) {
      this.loginService.logout(currentToken)
        .then(response => {
          console.log('Sesión cerrada en el servidor:', response);
        })
        .catch(error => {
          console.error('Error en el servidor al cerrar sesión:', error);
        })
        .finally(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.token = null;

          this.router.navigate(['/login']);
        });
    } else {

      localStorage.clear();
      this.router.navigate(['/login']);
    }

  }
}
