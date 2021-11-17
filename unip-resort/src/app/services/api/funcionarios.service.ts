import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/Funcionario';
import { baseUrl } from 'src/config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  baseUrl = baseUrl + 'funcionarios';

  constructor(
     private httpClient: HttpClient
    ,private authService: AuthService
    ,private toastrService: ToastrService
  ) { }

  findAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      tap(res => {this.successMessage(); return res}),
      catchError(er => {this.handleError(er); return er})
    );
  }

  create(f: Funcionario) {
    return this.httpClient.post(this.baseUrl, f);
  }

  successMessage() {
    this.toastrService.success('A requisição foi feita com sucesso!', 'Sucesso');
  }

  handleError(er:any, error_message?: string) {
    if(error_message) {
      return this.toastrService.error(error_message, "Ocorreu um erro.");
    }

    if(er.error.error === "Forbidden") {
      this.toastrService.warning("Faça o login novamente", "Sessão expirada...", { timeOut: 3000 });
      return this.authService.setToken();
    }

    return this.toastrService.error("Verifique sua conexão e tente novamente", "Houve um erro...");
  }
}
