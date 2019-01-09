import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContextUtil } from '../guard/context-util.service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService  {
  profissionais = null;
  constructor(private http: HttpClient) { }

  async getProfissionais() {
    const profissionais = await this.http.get(`${ContextUtil.getApiUrl()}profissional`, {responseType: 'json'}).toPromise();
    return profissionais;

  }

  async alterar(profissional) {
    console.log('alterar');
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(`${profissional.link}`,
                    JSON.stringify(profissional), {headers: headers}).toPromise();
    return result;
  }

  async inserir(profissional) {
    console.log('inserir');
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.post(`${ContextUtil.getApiUrl()}profissional`,
                    profissional, {headers: headers}).toPromise();
    return result;
  }

  async inativar(profissional) {
    profissional.ativo = false;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const result = await this.http.put(profissional._links.self.href, JSON.stringify(profissional),  {headers: headers}).toPromise();
    return result;
  }

}
