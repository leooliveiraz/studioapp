import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../entity/servico';
import swal from 'sweetalert2';
declare var M: any;
declare var $: any;

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  servicos = [];
  result = null;
  servico: any = new Servico(null, '', '', null, true);
  private modalCadastro = null;
  private modalEdicao = null;

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    M.AutoInit();
    this.configuraModal();
    this.carregarServicos();
    M.updateTextFields();
  }

  onSubmitCadastro(form) {
    try {
        const retorno = this.servicoService.inserir(JSON.stringify(form.value));
      swal('Serviço Salvo', '', 'success').then(res => this.modalCadastro.close());
      this.carregarServicos();

    } catch (error) {
      console.log(error);
    }
  }

  onSubmitEdicao(form) {
    try {
      const retorno = this.servicoService.alterar(form.value);
      swal('Serviço Salvo', '', 'success').then(res => this.modalEdicao.close());
      this.carregarServicos();

    } catch (error) {
      console.log(error);
    }
  }

  configuraModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
    const elem2 = document.querySelector('#modal2');
    this.modalEdicao = M.Modal.getInstance(elem2, {'dismissible': false});
  }

  abrirModal() {
    this.modalCadastro.open();
    this.servico = new Servico(null, '', '', null, true);
    M.updateTextFields();
  }

  abrirModalEdicao(servico) {
    this.modalEdicao.open();
    this.servico = servico;

    M.updateTextFields();
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
              this.servicoService.inativar(servico);
              swal('Serviço excluído.', '', 'success');
            }
          }
        );
  }

  carregarServicos() {
    this.servicoService.getServicos().then(res => {this.result = res; this.servicos = this.result._embedded.servico; });
  }

}
