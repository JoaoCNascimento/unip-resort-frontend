import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/api/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {  

    if (this.authService.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': this.authService.token,
        },
      });
    }

    if(request.url.split('/')[2] === "viacep.com.br") {
      request = request.clone({
        headers: request.headers.delete('Authorization')
      });
    }

    return next.handle(request);
  }
}
