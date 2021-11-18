import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Login } from "src/app/models/Login";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private readonly TOKEN: string = 'Authorization';

  baseUrl = "https://backend-pim.herokuapp.com/login";

  isLogged = new BehaviorSubject<boolean>(false);

  get token() {
    return localStorage.getItem(this.TOKEN);
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isLogged.next(!!this.token);
  }

  authenticate(login: Login) {
    return this.httpClient.post(this.baseUrl, login, { observe: 'response' }).pipe(
      tap(res => {
        this.setToken(res.headers.get('Authorization'));
      }),
      catchError(er => {this.handleError(er); return er})
    );
  }

  handleError(er: any, err?) {
    if(er.status === 401)
      return this.errorMessage("Senha ou email inválido(s).");

    this.errorMessage("Verifique sua conexão, ou o status do servidor, e tente novamente.");
  }

  errorMessage(message) {
    this.toastr.error(message);
  }

  successMessage(message) {
    this.toastr.success(message);
  }

  setToken(token?: string) {
    if (!localStorage.getItem('Authorization') && token) {
      localStorage.setItem(this.TOKEN, token);
      this.successMessage('Logado com sucesso!');
      this.router.navigate(['']);
    }
    else {
      localStorage.removeItem(this.TOKEN);
      this.router.navigate(['login']);
    }
  }
}
