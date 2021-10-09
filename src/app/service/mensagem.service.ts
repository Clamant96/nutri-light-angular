import { Observable } from 'rxjs';
import { Mensagem } from './../model/Mensagem';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  public url = environment.server + environment.porta;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  postMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.post<Mensagem>(`${this.url}/mensagens`, mensagem, this.autorizacao);
  }

  putMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.put<Mensagem>(`${this.url}/mensagens`, mensagem, this.autorizacao);
  }

}
