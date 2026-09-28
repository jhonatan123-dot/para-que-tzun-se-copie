import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './home/menu/menu';
import { Index } from './productos/index';
import {Login} from './auth/login/login';
import { Footer } from './home/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tienda');
}
