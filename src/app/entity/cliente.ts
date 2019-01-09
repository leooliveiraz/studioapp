export class Cliente {
  constructor(
      public nome: string,
      public descricao: string,
      public contato: string,
      public preencheuAnamnese: boolean,
      public ativo: boolean
  ) {}
}
