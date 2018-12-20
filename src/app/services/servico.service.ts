import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ContextUtil } from '../guard/context-util.service';
import { Servico } from '../entity/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService implements OnInit {

  constructor(private http: HttpClient) { }

  async getServicos() {
    const servicos = await this.http.get<Servico[]>(`${ContextUtil.getApiUrl()}servico`, {responseType: 'json'}).toPromise();
    return servicos;
  }


  async inserir(servico) {
    console.log(servico);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.post(`${ContextUtil.getApiUrl()}servico`,
                    servico, {headers: headers}).toPromise();
    return result;
  }


  ngOnInit(): void { }
}
