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
      tap(res => this.successMessage('Cadastrado com sucesso!')),
      catchError(er => {this.handleError(er); return er})
    );
  }

  findByEmail() {
    return this.httpClient.get(this.baseUrl + '/email/?value=' + this.authService.email.toString()).pipe(
      tap(res => {this.successMessage('Dados encontrados com sucesso!'); if(res === null){this.authService.setToken()} return res;}),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  delete(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
      tap(res => this.successMessage('Conta deletada com sucesso.')),
      catchError(er => {this.handleError(er); return er;})
    )
  }

  update(c: Cliente) {
    return this.httpClient.put(this.baseUrl + '/' + c.id, c).pipe(
      tap(res => this.successMessage('Conta atualizada com sucesso.')),
      catchError(er => {this.handleError(er); return er;})
    )
  }

  findAll() {
    return this.httpClient.get(this.baseUrl).pipe(
      tap(res => this.successMessage('Clientes retornados com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    )
  }

  forgotPassword(email: string) {
    return this.httpClient.post( baseUrl + 'auth/forgot', {
      email
    }).pipe(
      tap(res => this.successMessage('Nova senha enviada para: ' + email)),
      catchError(er => {this.handleError(er); return er;})
    )
  }

  successMessage(message) {
    this.toastrService.success(message);
  }

  errorMessage(message) {
    this.toastrService.error(message);
  }

  handleError(er:any) {
    console.log(er);
    
    if(er.status === 400)
    {
      if(er.error.errors)
        return this.toastrService.warning(er.error.errors[0].message, 'Erro no campo: ' + er.error.errors[0].fieldName);

      if(er.error.message)
        return this.toastrService.warning(er.error.message);

      return this.errorMessage('Verifique se todos os campos foram preenchidos corretamente.');
    }

    if(er.status === 500)
      return this.errorMessage('Houve um erro no servidor, tente novamente mais tarde.');

    this.errorMessage('Verifique sua conexão, ou o estado do servidor, e tente novamente.');
  }

}
