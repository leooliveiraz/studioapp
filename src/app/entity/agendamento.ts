import { FormaPagamento } from './formapagamento';
import { Cliente } from './cliente';
import { Profissional } from './profissional';

export class Agendamento {
  constructor(
      public data: Date,
      public horario: Date,
      public ativo: boolean,
      public pago: boolean,
      public cliente: Cliente,
      public formaPagamento: FormaPagamento,
      public profissional: Profissional
  ) {}
}
