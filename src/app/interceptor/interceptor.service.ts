import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private user!: User;
  // private socio: Socio;

  constructor(
    private seguridadService: AuthService /*,
    private sesionSocioService: SesionSocioService*/
  ) {
    // this.seguridad = this.service.seguridad
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.user = this.seguridadService.user;
    // this.socio = this.sesionSocioService.sesionSocio;

    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || '',
      id_user_session: this.user ? this.user._id : '',
      user_session: this.user ? this.user.name : '',
    });

    const req_clone = req.clone({
      headers,
    });

    return next.handle(req_clone).pipe(catchError(this.gestionError));

    // return next.handle( req );
  }

  gestionError(err: HttpErrorResponse) {
    Swal.fire({
      text: err.error.msg,
      icon: 'error',
    });
    return throwError('Error personalizado.');
  }
}
