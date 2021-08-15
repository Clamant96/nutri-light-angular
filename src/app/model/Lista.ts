import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export class Lista {
  public id: number;
	public usuario: Usuario;
	public produtos: Produto[];
}
