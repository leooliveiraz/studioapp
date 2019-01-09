import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ContextUtil } from '../guard/context-util.service';
import { Cliente } from '../entity/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnInit {

  constructor(private http: HttpClient) { }

  async getClientes() {
    const clientes = await this.http.get(`${ContextUtil.getApiUrl()}cliente`, {responseType: 'json'}).toPromise();
    return clientes;
  }

  async alterar ( cliente: any) {
    console.log(JSON.stringify(cliente));
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(`${cliente.link}`,
                    JSON.stringify(cliente), {headers: headers}).toPromise();
    console.log(result);
    return result;
  }

  async inserir(cliente) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.post(`${ContextUtil.getApiUrl()}cliente`,
                    cliente, {headers: headers}).toPromise();
    return result;
  }

  async inativar(cliente) {
    cliente.ativo = false;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(cliente._links.self.href, JSON.stringify(cliente), {headers: headers}).toPromise();
    return result;
  }

  ngOnInit(): void { }
}
