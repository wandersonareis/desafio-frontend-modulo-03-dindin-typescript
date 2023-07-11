import { User } from "./user.dto";

export interface ILoginData {
  usuario: User;
  token: string;
}

export class LoginData implements ILoginData {
  usuario: User;
  token: string;
}
