import { Usuario } from './Usuario';
import { Mensagem } from './Mensagem';
import { Categoria } from "./Categoria";
import { Lista } from "./Lista";

export class Produto {
  public id: number;
	public nome: string;
	public kg: number;
	public img: string;
	public categoria: Categoria;
	public listas: Lista[];
  public mensagens: Mensagem[];
  public usuario: Usuario;
  public like: Usuario[];
}
