import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Categoria } from "src/app/models/Categoria";

import { baseUrl } from "../../../config/config";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  baseUrl = baseUrl + "categorias";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  findAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      tap((res) => {
        // this.successMessage();
        res = res.map((c: Categoria) => {
          c.imageUrl =
            "https://pim-unip-resort.s3.sa-east-1.amazonaws.com/" + c.imageUrl;
          return c;
        });
        return res;
      }),
      catchError((er) => {
        this.handleError(er);
        return er;
      })
    );
  }

  create(c: Categoria | any) {
    return this.httpClient.post(this.baseUrl, c).pipe(
      tap((res) => {
        this.successMessage();
        return res;
      }),
      catchError((er) => {
        this.handleError(er);
        return er;
      })
    );
  }

  deleteById(id) {
    return this.httpClient.delete(this.baseUrl + "/" + id).pipe(
      tap((res) => {
        this.successMessage();
        return res;
      }),
      catchError((er) => {
        this.handleError(er);
        return er;
      })
    );
  }

  successMessage() {
    this.toastrService.success(
      "A requisição foi feita com sucesso!",
      "Sucesso"
    );
  }

  handleError(er: any, error_message?: string) {
    if (error_message) {
      return this.toastrService.error(error_message, "Ocorreu um erro.");
    }

    if (er.error.error === "Forbidden") {
      this.toastrService.warning(
        "Faça o login novamente",
        "Sessão expirada...",
        { timeOut: 3000 }
      );
      return this.authService.setToken();
    }

    return this.toastrService.error(
      "Verifique sua conexão e tente novamente",
      "Houve um erro..."
    );
  }
}
