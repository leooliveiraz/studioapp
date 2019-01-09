import { FormaPagamento } from './formapagamento';
import { Cliente } from './cliente';

export class Agendamento {
  constructor(
      public data: Date,
      public horario: Date,
      public ativo: boolean,
      public pago: boolean,
      public cliente: Cliente,
      public formaPagamento: FormaPagamento
  ) {}
}
