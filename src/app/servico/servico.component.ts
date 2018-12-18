import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../entity/servico';
declare var M: any;

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  menu = null;
  servicos = null;

  constructor(private servicoService: ServicoService) { }

  abreMenu() {
    const botao = document.querySelector('.fixed-action-btn');
    const menu = M.FloatingActionButton.getInstance( botao );
  }

  ngOnInit() {
    M.AutoInit();
    this.servicoService.getServicos();
  }


}
