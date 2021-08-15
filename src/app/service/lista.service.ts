import { Produto } from './../model/Produto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public url = environment.server + environment.porta;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  findByIdListaUsuario(id: number): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.url}/listas/listaProdutos/${id}`, this.autorizacao);
  }

}
