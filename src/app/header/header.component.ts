import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authSevice: AuthenticationService) { }

  ngOnInit() {
    M.AutoInit();
    const elem = document.querySelector('.sidenav');
    const instance =  M.Sidenav.getInstance(elem, {dragabble: true} );
  }

  fechar() {
    const elem = document.querySelector('.sidenav');
    const instance =  M.Sidenav.getInstance(elem);
    instance.close();
  }

  estaLogado() {
    const logado = this.authSevice.estaAutenticado();
    return logado;
  }

}
