import { Component, OnInit } from '@angular/core';


import swal from 'sweetalert2';
declare var M: any;
@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

  agendamento = null;
  agendamentos = null;
  modalCadastro = null;
  constructor() { }

  ngOnInit() {
    M.AutoInit();
    this.configurarModal();
  }


  botaoAdicionar() {
    this.modalCadastro.open();
  }
  configurarModal() {
    const elem = document.querySelector('#modal1');
    this.modalCadastro = M.Modal.getInstance(elem, {'dismissible': false});
  }

}
