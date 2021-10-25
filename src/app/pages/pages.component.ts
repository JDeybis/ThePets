import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  user!: User;
  menu: any = [];

  constructor(private service: AuthService) {
    this.user = this.service.user;
  }

  ngOnInit(): void {
    this.menu = this.getMenu(this.user);
  }

  logout() {
    this.service.logout();
  }

  getMenu(user: User) {
    let opts = [
      {
        menu: 'Inicio',
        route: 'home',
      },
    ];

    if (user.role.role === 'admin') {
      opts.push({
        menu: 'mascotas',
        route: 'mascotas',
      });
    } else {
      opts.push(
        {
          menu: 'mascotas',
          route: 'mascotas/normal',
        },
        {
          menu: 'Favoritos',
          route: 'mis-mascotas',
        }
      );
    }

    return opts;
  }
}
