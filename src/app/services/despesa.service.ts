import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ObjetoGraficoModel } from '../models/ObjetoGraficoModel';
import { Despesa } from './../models/Despesa';

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

  ObterDespesa = (id: number) =>
    this.httpClient.get(`${this.baseUrl}/ObterDespesa?id=${id}`);

  AtualizarDespesa = (despesa: Despesa) =>
    this.httpClient.put<Despesa>(`${this.baseUrl}/AtualizarDespesa`, despesa);

  CarregaGraficos = (emailUsuario: string) =>
    this.httpClient.get<ObjetoGraficoModel>(
      `${this.baseUrl}/CarregaGraficos?emailUsuario=${emailUsuario}`
    );
}
