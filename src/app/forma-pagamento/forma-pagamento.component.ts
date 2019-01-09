import { FormaPagamento } from './../entity/formapagamento';
import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../services/forma-pagamento.service';

import swal from 'sweetalert2';
declare var M: any;

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  formasPagamento = null;
  formaPagamento = null;
  modalCadastro = null;

  constructor(private formaPagamentoService: FormaPagamentoService ) { }

  ngOnInit() {
    M.AutoInit();
    this.configuraModal();
    this.formasPagamento = [];
    this.formaPagamento = new FormaPagamento('', true);
    this.carregarFormasPagamento();
  }

  carregarFormasPagamento() {
    let result = null;
    this.formaPagamentoService.getFormasPagamento()
      .then(res => {result = res; this.formasPagamento = result._embedded.formapagamento; });
  }
  botaoAdicionar() {
    this.modalCadastro.open();
    this.formaPagamento = new FormaPagamento('',  true);
  }
  configuraModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }
  salvar(form) {
    if ( !this.formaPagamento._links) {
      const retorno = this.formaPagamentoService.inserir(JSON.stringify(form.value));
    } else {
      const retorno = this.formaPagamentoService.alterar(form.value);
    }
    swal('Forma de Pagamento Salva', '', 'success')
      .then(res => {
          this.carregarFormasPagamento();
          this.modalCadastro.close();
        } );
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
              this.formaPagamentoService.inativar(servico);
              swal('Forma de Pagamento excluída.', '', 'success');
            }
          }
        );
  }

}
