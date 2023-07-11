export enum TransactionType {
  CREDITS = "entrada",
  DEBITS = "saida",
}

export interface ITransaction {
  id: number;
  tipo: TransactionType;
  descricao: string;
  valor: number;
  data: string;
  categoria_id: number;
  categoria_nome?: string;
  usuario_id?: number;
}

export class Transaction implements ITransaction {
  id: number;
  tipo: TransactionType = TransactionType.DEBITS;
  descricao: string;
  valor: number;
  data: string;
  categoria_id = 1;
  categoria_nome?: string | undefined;
  usuario_id?: number;
  isSelected? = false;
}
