import { Component, OnInit } from '@angular/core';


import { ServicoService } from '../services/servico.service';
import { Agendamento } from '../entity/agendamento';
import { ProfissionalService } from '../services/profissional.service';
import { ClienteService } from '../services/cliente.service';
declare var M: any;
declare var $: any;

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

  agendamento = null;
  agendamentos = [];
  modalCadastro = null;
  profissional = null;
  profissionais = [];
  servicos = [];
  servico = null;

  constructor( private profissionalService: ProfissionalService,
              private servicoService: ServicoService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    M.AutoInit();
    this.configurarModal();
    this.agendamento = new Agendamento(null, null, true, false, null, null, null);
    this.carregarProfissionais();
    this.carregarServicos();
    this.carregarClientes();
    this.configurarAutoCompleteCliente();
  }


  botaoAdicionar() {
    $('select').formSelect();
    this.agendamento = new Agendamento(null, null, true, false, null, null, null);
    this.modalCadastro.open();
  }
  configurarModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }

  carregarProfissionais() {
    let result = null;
    this.profissionalService.getProfissionais().then(res => { result = res;
        this.profissionais = result._embedded.profissional;
      });

  }

  carregarServicos() {
    let result = null;
    this.servicoService.getServicos().then(res => { result = res;
        this.servicos = result._embedded.servico;
      });
  }

  carregarClientes() {
    let result = null;
    this.clienteService.getClientes().then(res => { result = res;
        this.servicos = result._embedded.cliente;
        console.log(res);
      });
  }

  configurarAutoCompleteCliente() {
    const elem = document.querySelector('.autocomplete');
    const instance = M.Autocomplete.getInstance(elem);
    instance.updateData({
      'Apple': null
    });
  }

  salvar(form) {

  }

}
