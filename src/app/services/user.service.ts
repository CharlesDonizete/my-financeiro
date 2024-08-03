import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  AdicionarUsuario = (email: string, senha: string, cpf: string) =>
    this.httpClient.post<any>(`${this.baseUrl}/AdicionaUsuario`, {
      email,
      senha,
      cpf,
    });

  AtualizarUsuario = (id: string, email: string, senha: string, cpf: string) =>
    this.httpClient.put<any>(`${this.baseUrl}/AtualizaUsuario/${id}`, {
      email,
      senha,
      cpf,
    });

  DeletarUsuario = (id: string) =>
    this.httpClient.delete<any>(`${this.baseUrl}/DeletaUsuario/${id}`);

  ListarUsuarios = () =>
    this.httpClient.get<Array<UsuarioModel>>(`${this.baseUrl}/ListaUsuarios`);
}
