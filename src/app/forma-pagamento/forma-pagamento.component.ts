import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../services/forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  formaspagamento = null;

  constructor(private formaPagamentoService: FormaPagamentoService ) { }

  ngOnInit() {
    this.carregarFormasPagamento();
  }

  carregarFormasPagamento() {
    let result = null;
    this.formaPagamentoService.getFormasPagamento().then(res => {result = res; this.formaspagamento = result._embedded.formapagamento; });
    console.log(result);
  }
}
