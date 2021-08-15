import { Categoria } from "./Categoria";
import { Lista } from "./Lista";

export class Produto {
  public id: number;
	public nome: string;
	public kg: number;
	public img: string;
	public categoria: Categoria;
	public listas: Lista[];
}
