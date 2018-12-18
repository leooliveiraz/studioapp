import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ContextUtil } from '../guard/context-util.service';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  async realizarLogin(usuario) {
    try {
      const jwt = await this.http.post(`${ContextUtil.getApiUrl()}login`, usuario, {responseType: 'text'}).toPromise();
      this.salvarAutenticacao( usuario, jwt);
      this.router.navigate(['/home']);
    } catch (error) {
      sessionStorage.setItem('auth', '0');
      if (error.status === 403) {
        swal('Ops', 'Usuário ou senha não encontrados', 'error');
      } else {
        swal(`Erro  + ${error}`, 'Ops, erro não tratado', 'error');
      }
    }

  }

  private salvarAutenticacao(usuario, jwt) {
    sessionStorage.setItem('usuario', JSON.parse(usuario).username);
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('auth', '1');
  }

  getToken() {
    const token = sessionStorage.getItem('token');
    if (token.length !== 0) {
      return token;
    } else {
      return null;
    }
  }

  async validaToken() {
    const headers = new Headers();
    try {
      await this.http.get(`${ContextUtil.getApiUrl()}sessao/validaToken`, {
        headers: new HttpHeaders().set('Authorization', this.getToken()),
        responseType: 'json'
      }).toPromise();
      return true;
    } catch (error) {
      sessionStorage.setItem('auth', '0');
      return false;
    }
  }

  estaAutenticado() {
    const auth =  sessionStorage.getItem('auth');
    if (auth === '1') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
