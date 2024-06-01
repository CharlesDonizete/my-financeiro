import { Despesa } from './../models/Despesa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  AdicionarDespesa = (despesa: Despesa) =>
    this.httpClient.post<Despesa>(`${this.baseUrl}/AdicionarDespesa`, despesa);

  ListaDespesaUsuario = (emailUsuario: string) =>
    this.httpClient.get(
      `${this.baseUrl}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`
    );
}
