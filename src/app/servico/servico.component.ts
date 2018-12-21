import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../entity/servico';
import swal from 'sweetalert2';
declare var M: any;

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  servicos = null;
  result = null;
  servico: any = new Servico(null, '', '', null, true);
  private modalCadastro = null;

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    M.AutoInit();
    this.configuraModal();
    this.carregarServicos();
    M.updateTextFields();
  }

  onSubmitCadastro(form) {
    try {
      if(form._links){
        const retorno = this.servicoService.inserir(JSON.stringify(form.value));
        console.log(retorno);
      } else {
        const retorno = this.servicoService.alterar(form.value);
        console.log(retorno);
      }
      swal('Serviço Salvo', '', 'success').then(res => this.modalCadastro.close());
      this.carregarServicos();

    } catch (error) {
      console.log(error);
    }
  }

  configuraModal() {
    const elem = document.querySelector('.modal');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }

  abrirModal() {
    this.modalCadastro.open();
    this.servico = new Servico(null, '', '', null, true);
    M.updateTextFields();
  }

  abrirModalEdicao(servico) {
    this.modalCadastro.open();
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
          .then(res=>
            {
              if(res.value){
                this.servicoService.inativar(servico);
                swal('Serviço excluído.','' , 'success');
              }  
            }
          );
  }

  carregarServicos() {
    this.servicoService.getServicos().then(res => {this.result = res; this.servicos = this.result._embedded.servico; });
  }

}
