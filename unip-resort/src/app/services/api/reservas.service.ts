import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Reserva } from "src/app/models/Reserva";
import { baseUrl } from "src/config/config";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ReservasService {
  readonly baseUrl = baseUrl + "reservas";

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  findAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl).pipe(
      tap(),
      catchError((er) => {
        this.handleError(er);
        return er;
      })
    );
  }

  findById(id): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + id).pipe(
      tap(),
      catchError(er => { this.handleError(er); return er; })
    );
  }

  check(r: Reserva) {
    return this.httpClient.put(this.baseUrl + '/check/' + r.id, {
      quarto: r.quarto.id,
      cliente: r.cliente.id,
      dataReserva: r.dataReserva,
      dataSaida: r.dataSaida,
      tempoEstadia: r.tempoEstadia
    }).pipe(
      tap(res => this.toastr.success('Check in realizado.')),
      catchError(er => {this.handleError(er); return er; })
    )
  }

  create(reserva: Reserva) {
    return this.httpClient
      .post(this.baseUrl, {
        dataReserva: reserva.dataReserva,
        dataSaida: reserva.dataSaida,
        tempoEstadia: reserva.tempoEstadia,
        cliente: reserva.cliente,
        quarto: reserva.quarto,
      })
      .pipe(
        tap((res) => this.toastr.success("Reserva feita com sucesso!")),
        catchError((er) => {
          this.handleError(er);
          return er;
        })
      );
  }

  update(reserva: Reserva) {
    return this.httpClient
      .put(this.baseUrl + '/' + reserva.id, {
        dataReserva: reserva.dataReserva,
        dataSaida: reserva.dataSaida,
        tempoEstadia: reserva.tempoEstadia,
        cliente: reserva.cliente,
        quarto: reserva.quarto,
      })
      .pipe(
        tap((res) => this.toastr.success("Reserva atualizada com sucesso!")),
        catchError((er) => {
          this.handleError(er);
          return er;
        })
      );
  }

  delete(id: number) {
    return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
      tap(res => this.toastr.success('Reserva de id: ' + id + ', deletada com êxito.', 'Sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    )
  }

  handleError(er: any) {
    if (er.status === 403) {
      this.errorMessage("Acesso negado, faça o login novamente.");
      this.authService.setToken();
    }

    if (er.status === 400) {
      if (er.error.message) return this.toastr.warning(er.error.message);
    }

    if (er.status === 500)
      return this.errorMessage(
        "Houve um erro no servidor, tente novamente mais tarde."
      );

    this.errorMessage(
      "Verifique sua conexão, ou o estado do servidor, e tente novamente."
    );
  }

  errorMessage(message) {
    this.toastr.error(message);
  }
}
