import { SistemaFinanceiro } from './../models/SistemaFinanceiro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  AdicionarSistemaFinanceiro = (sistemaFinanceiro: SistemaFinanceiro) =>
    this.httpClient.post<SistemaFinanceiro>(
      `${this.baseUrl}/AdicionarSistemaFinanceiro`,
      sistemaFinanceiro
    );

  ListaSistemaUsuario = (emailUsuario: string) =>
    this.httpClient.get(
      `${this.baseUrl}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`
    );

  CadastraUsuarioNoSistema = (idSistema: number, emailUsuario: string) =>
    this.httpClient.post<SistemaFinanceiro>(
      `${this.baseUrl}/CadastraUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`,
      null
    );

  ObterSistemaFinanceiro = (id: number) =>
    this.httpClient.get(`${this.baseUrl}/ObterSistemaFinanceiro?id=${id}`);

  AtualizarSistemaFinanceiro = (sistemaFinanceiro: SistemaFinanceiro) =>
    this.httpClient.put<SistemaFinanceiro>(
      `${this.baseUrl}/AtualizarSistemaFinanceiro`,
      sistemaFinanceiro
    );

  ExecuteCopiaDespesasSistemaFinanceiro = () =>
    this.httpClient.post<SistemaFinanceiro>(
      `${this.baseUrl}/ExecuteCopiaDespesasSistemaFinanceiro?`,
      null
    );
}
