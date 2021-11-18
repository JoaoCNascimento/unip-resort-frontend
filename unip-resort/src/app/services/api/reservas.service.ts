import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { baseUrl } from 'src/config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  readonly baseUrl = baseUrl + 'reservas';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
    ) { }

  findAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl).pipe(
      tap(),
      catchError(er => {this.handleError(er); return er})
    );
  }

  handleError(er: any) {
    if(er.status === 403) {
      this.errorMessage('Acesso negado, faça o login novamente.');
      this.authService.setToken();
    }
  }

  errorMessage(message) {
    this.toastr.error(message);
  }
}
