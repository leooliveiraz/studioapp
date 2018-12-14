import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  async realizarLogin(usuario) {
    try {
      const jwt = await this.http.post(`http://localhost:9000/login`, usuario, {responseType: 'text'}).toPromise();
      this.salvarAutenticacao( usuario, jwt);
      this.router.navigate(['/home']);
    } catch (error) {
      sessionStorage.setItem('autenticado', '0');
      if (error.status === 403) {
        swal('Ops', 'Usuário ou senha não encontrados', 'error');
      } else {
        swal(`Erro ` + error.status, 'Ops, erro não tratado', 'error');
      }
    }

  }

  private salvarAutenticacao(usuario, jwt) {
    console.log(jwt);
    sessionStorage.setItem('usuario', JSON.parse(usuario).username);
    sessionStorage.setItem('jtoken', jwt);
    sessionStorage.setItem('autenticado', '1');
  }

  getToken() {
    const token = sessionStorage.getItem('jtoken');
    return token;
  }

  async tokenValido() {
    let autenticado = false;
    const headers = new Headers();
    try {
      this.http.get('http://localhost:9000/sessao/validaToken', {
        // tslint:disable-next-line:max-line-length
        headers: new HttpHeaders().set('Authorization', this.getToken()),
        responseType: 'json'
      }).subscribe(response => {
        sessionStorage.setItem('autenticado', '1');
        autenticado = true;
      });
    } catch (error) {
      sessionStorage.setItem('autenticado', '0');
      autenticado = false;
    }
    console.log(autenticado);
    return autenticado;
  }

  estaAutenticado() {
    // const valor = this.tokenValido();
    const autenticado: string  = sessionStorage.getItem('autenticado');
    // tslint:disable-next-line:triple-equals
    if ( autenticado == '1' ) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    console.log('logout');
    sessionStorage.setItem('autenticado', '0');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
