import { HttpClient } from '@angular/common/http';
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
    console.log(servicos);
    return servicos;
  }

  ngOnInit(): void { }
}
