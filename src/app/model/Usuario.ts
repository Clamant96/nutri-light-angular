import { Produto } from './Produto';
import { Lista } from "./Lista";

export class Usuario {
  public id: number;
	public nome: string;
	public idade: number;
	public peso: number;
	public username: string;
	public senha: string;
	public altura: number;
	public foto: string;
	public imc: number;
	public lista: Lista;
  public produtos: Produto[];
  public likeProduto: Produto[];
}
