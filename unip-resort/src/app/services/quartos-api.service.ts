import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quarto } from '../models/Quarto';

@Injectable({
  providedIn: 'root'
})
export class QuartosApiService {

  baseUrl: string = "http://localhost:3000/quarto";

  constructor(
    private httpClient: HttpClient
  ) { }

  getQuartos(): Observable<Quarto[]> {
    return this.httpClient.get<Quarto[]>(this.baseUrl);
  }
}
