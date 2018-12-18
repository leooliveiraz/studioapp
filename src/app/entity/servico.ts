export class Servico {
  constructor(
      public id: number,
      public nome: string,
      public descricao: string,
      public valor: number,
      public ativo: boolean
  ) {}
}
