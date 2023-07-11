export interface IUser {
  id: number;
  nome: string;
  email: string;
}

export class User implements IUser {
  id: number;
  nome: string;
  email: string;
}
