import { Component, OnInit } from '@angular/core';
import { Cliente } from '../entity/cliente';
import { ClienteService } from '../services/cliente.service';

import swal from 'sweetalert2';
declare var M: any;
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes = [] ;
  cliente = null;
  result = null;
  modalCadastro = null;

  constructor ( private clienteService: ClienteService) { }

  ngOnInit() {
    M.AutoInit();
    this.cliente = new Cliente('', '', '', false, true);
    this.configuraModal();
    this.carregarClientes();
  }
  salvar(form) {
    if ( !this.cliente._links) {
      const retorno = this.clienteService.inserir(JSON.stringify(form.value));
    } else {
      const retorno = this.clienteService.alterar(form.value);
    }
    swal('Serviço Salvo', '', 'success')
      .then(res => {
          this.modalCadastro.close();
          this.carregarClientes();
        } );
  }
  botaoAdicionar() {
    this.cliente = new Cliente('', '' , '', false, true );
    this.modalCadastro.open();
  }
  configuraModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }
  carregarClientes() {
    this.clienteService.getClientes().then(res => { this.result = res;
      console.log(this.result);
        this.clientes = this.result._embedded.cliente; });
  }

  botaoEditar(cliente ) {
    this.modalCadastro.open();
    this.cliente = cliente;
  }

  confirmarInativacao(servico) {
    swal({ title: 'Deseja Inativar esse registro?',
          text:  '' ,
          type: 'warning' ,
        showCancelButton: true ,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'})
        .then(res => {
            if (res.value) {
              this.clienteService.inativar(servico);
              swal('Profissional excluído.', '', 'success');
            }
          }
        );
  }

}
