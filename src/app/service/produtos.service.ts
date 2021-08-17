import { Usuario } from './../model/Usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  public url = environment.server + environment.porta;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  getAllProdutos(): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.url}/produtos`);
  }

  getAllByIdProduto(id: number): Observable<Produto> {

    return this.http.get<Produto>(`${this.url}/produtos/${id}`);
  }

  postProduto(produto: Produto): Observable<Produto> {

    return this.http.post<Produto>(`${this.url}/produtos`, produto, this.autorizacao);
  }

  putProduto(produto: Produto): Observable<Produto> {

    return this.http.put<Produto>(`${this.url}/produtos`, produto, this.autorizacao);
  }

  adicionarProdutoAListaDoUsuario(idProduto: number, idLista: number): Observable<Produto[]> {

    return this.http.put<Produto[]>(`${this.url}/produtos/tabela_produtos/produtos/${idProduto}/lista/${idLista}`, this.autorizacao);
  }

  removerProdutoAListaDoUsuario(idProduto: number, idLista: number): Observable<Produto[]> {

    return this.http.put<Produto[]>(`${this.url}/produtos/deleta/tabela_produtos/produtos/${idProduto}/lista/${idLista}`, this.autorizacao);
  }

}
