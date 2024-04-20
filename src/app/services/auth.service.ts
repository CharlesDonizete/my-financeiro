import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticadoPortal: boolean = false;
  private token: any;
  private user: any;

  constructor(private httpClient: HttpClient) {}

  checkToken() {
    return Promise.resolve(true);
  }

  usuarioAutenticado(status: boolean) {
    localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
    this.usuarioAutenticadoPortal = status;
  }

  usuarioEstaAutenticado(): Promise<boolean> {
    this.usuarioAutenticadoPortal =
      localStorage.getItem('usuarioAutenticadoPortal') == 'true';
    return Promise.resolve(this.usuarioAutenticadoPortal);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  get getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  limparToken() {
    this.token = null;
    this.user = null;
  }

  limparDadosUsuario() {
    this.usuarioAutenticado(false);
    this.limparToken();
    localStorage.clear();
    sessionStorage.clear();
  }
}
