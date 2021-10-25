import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Login } from '../interfaces/Login.interface';
import { User } from '../models/User.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: Login) {
    return this.http.post(`${base_url}/auth/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  validarToken(): Observable<any> {
    return this.http.get(`${base_url}/auth/renovar_token`).pipe(
      tap((res: any) => {
        const { _id, name, email, role } = res.user;

        this.user = new User(_id, name, email, role);
        localStorage.setItem('token', res.token);
      }),
      map((res) => ({
        esta_autenticado: true,
      })),
      catchError((err) =>
        of({
          esta_autenticado: false,
        })
      )
    );
  }

  logout() {
    localStorage.removeItem('token');

    return this.router.navigateByUrl('/login');
  }
}
