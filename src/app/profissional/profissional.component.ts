import { Component, OnInit } from '@angular/core';
import { Profissional } from '../entity/profissional';
import { ProfissionalService } from '../services/profissional.service';

import swal from 'sweetalert2';
declare var M: any;
declare var $: any;
@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  usuario = null;
  profissional = null;
  profissionais = [];
  modalCadastro = null;
  result = null;


  constructor(private profissionalService: ProfissionalService) { }

  carregarProfissionais() {
    this.profissionalService.getProfissionais().then(res => { this.result = res;
        this.profissionais = this.result._embedded.profissional; });
  }


  gerarUsuario() {

  }

  botaoAdicionar() {
    this.modalCadastro.open();
    this.profissional = new Profissional('', '' , true);
  }

  botaoEditar(profissional ) {
    this.modalCadastro.open();
    this.profissional = profissional;
  }

  salvarProfissional(form) {
    if ( !this.profissional._links) {
      const retorno = this.profissionalService.inserir(JSON.stringify(form.value));
    } else {
      const retorno = this.profissionalService.alterar(form.value);
    }
    this.carregarProfissionais();
    swal('Serviço Salvo', '', 'success')
      .then(res => {
          this.modalCadastro.close();
          this.carregarProfissionais();
        } );
  }

  configuraModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }

  ngOnInit() {
    M.AutoInit();
    this.configuraModal();
    this.profissional = new Profissional('', '' , true);
    this.carregarProfissionais();
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
              this.profissionalService.inativar(servico);
              swal('Profissional excluído.', '', 'success');
            }
          }
        );
  }

}
