import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SistemaFinanceiro } from '../models/SistemaFinanceiro';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSistemaFinanceiroService {
  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) {}

  CadastraUsuarioNoSistema = (idSistema: number, emailUsuario: string) =>
    this.httpClient.post<SistemaFinanceiro>(
      `${this.baseUrl}/CadastraUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`,
      null
    );

  ListarUsuariosSistema = (idSistema: number) =>
    this.httpClient.get(
      `${this.baseUrl}/ListarUsuariosSistema?idSistema=${idSistema}`
    );

  DeleteUsuarioSistemaFinanceiro = (id: number) =>
    this.httpClient.delete(
      `${this.baseUrl}/DeleteUsuarioSistemaFinanceiro?id=${id}`
    );
}
