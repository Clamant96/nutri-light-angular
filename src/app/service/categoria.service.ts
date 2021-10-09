import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  /* CRIAR UMA VARIAVEL PARA ARMAZENAR DINAMICAMENTE A ROTA DO SERVIDOR */
  public url = environment.server + environment.porta;

  /* INJETA DEPENDENCIA DOS METODOS HTTP DENTRO DO SERVICE */
  constructor(
    private http: HttpClient

  ) { }

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  /* CRIA UM METODO GET PARA PESQUISAR TODOS OS TEMAS E TRAZER EM FORMA DE ARRAY, UMA VEZ QUE ESTAMOS CHAMANDO TODOS OS DADOS */
  findAllCategorias(): Observable<Categoria[]> {
    console.log('Minha autorizacao: '+ this.autorizacao.headers);

    /* RETORNAMOS O TOKEN */
    return this.http.get<Categoria[]>(`${this.url}/categorias`, this.autorizacao);
  }

  /* CRIA UM METODO GET RESPOSAVEL POR PESQUISAR UMA TEMA POR ID ESPECIFICO */
  findByIdCategoria(id: number): Observable<Categoria> {

    /* RETORNAMOS O OBJETO TEMA POR MEIO DE SEU ID */
    return this.http.get<Categoria>(`${this.url}/categorias/${id}`, this.autorizacao);
  }

  /* CRIA UM METODO POST CADASTRAR UM DADO DENTRO DA BASE DE DADOS, NESSE CASO RECEBEMOS COMO PARATRO UM OBJETO, NO CASO Tema */
  portCategoria(categoria: Categoria): Observable<Categoria> {

    /* RETORNAMOS O ATRIBUTO RECEBIDO DO USUARIO E O TOKEN */
    return this.http.post<Categoria>(`${this.url}/categorias`, categoria, this.autorizacao);
  }

  /* CRIA UM METODO PUT ATUALIZA UM DADO JA EXISTENTE INFORMADO PELO USUARIO */
  putCategoria(categoria: Categoria): Observable<Categoria> {

    /* RETORNAMOS O DADO ATUALIZADO PARA USUARIO E O TOKEN */
    return this.http.put<Categoria>(`${this.url}/categorias`, categoria, this.autorizacao);
  }

  /* CRIA UM METODO DELETE QUE DELETA UM DADO INFORMADO PELO USUARIO, PASSANDO COMO PARAMTRO UM ID */
  deleteCategoria(id: number) {

    /* DELETA O DADO DA BASE DE DADOS */
    return this.http.delete(`${this.url}/categorias/${id}`, this.autorizacao);
  }

}
