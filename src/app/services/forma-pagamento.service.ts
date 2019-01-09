import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContextUtil } from '../guard/context-util.service';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  constructor(private http: HttpClient) { }

  async getFormasPagamento() {
    const formaPagamento = await this.http.get(`${ContextUtil.getApiUrl()}formapagamento`, {responseType: 'json'}).toPromise();
    console.log(formaPagamento);
    return formaPagamento;
  }

  async alterar(formapagamento) {
    console.log(JSON.stringify(formapagamento));
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(`${formapagamento.link}`,
                    JSON.stringify(formapagamento), {headers: headers}).toPromise();
    console.log(result);
    return result;
  }

  async inserir(formapagamento) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.post(`${ContextUtil.getApiUrl()}formapagamento`,
                    formapagamento, {headers: headers}).toPromise();
    return result;
  }

  async inativar(formapagamento) {
    formapagamento.ativo = false;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(formapagamento._links.self.href, JSON.stringify(formapagamento),  {headers: headers}).toPromise();
    return result;
  }


}
