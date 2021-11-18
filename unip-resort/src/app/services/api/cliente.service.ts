import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/Cliente';
import { baseUrl } from 'src/config/config';
import { CepService } from '../cep.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  form: FormGroup;

  readonly baseUrl = baseUrl + 'clientes';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cepService: CepService,
    private toastrService: ToastrService
  ) { }

  createCliente(c: Cliente) {
    return this.httpClient.post(this.baseUrl, c).pipe(
      tap(),
      catchError(er => {this.handleError(er); return er})
    );
  }

  successMessage(message) {
    this.toastrService.success(message);
  }

  errorMessage(message) {
    this.toastrService.error(message);
  }

  handleError(er:any) {
    this.errorMessage('Verifique sua conexão, ou o estado do servidor, e tente novamente.');
  }

}
