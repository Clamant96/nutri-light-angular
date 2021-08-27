import { Produto } from './Produto';
import { Lista } from "./Lista";

export class UserLogin {
  public id: number;
	public nome: string;
	public idade: number;
	public peso: number;
	public username: string;
	public senha: string;
	public altura: number;
	public lista: Lista;
	public token: string;
	public foto: string;
	public imc: number;
  public produtos: Produto[];
}
