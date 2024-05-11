import { Categoria } from './../models/Categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  AdicionarCategoria = (categoria: Categoria) =>
    this.httpClient.post<Categoria>(
      `${this.baseUrl}/AdicionarCategoria`,
      categoria
    );

  ListaCategoriaUsuario = (emailUsuario: string) =>
    this.httpClient.get(
      `${this.baseUrl}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`
    );
}
