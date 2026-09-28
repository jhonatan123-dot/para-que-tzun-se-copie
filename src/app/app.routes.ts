import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Body } from './home/body/body';
import { authGuard } from './auth/auth.guard'
import { Index as indexProducto } from './productos/index';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Body},
    { path: 'producto', component: indexProducto, canActivate: [authGuard] },
    {path: 'login', component: Login},
];
