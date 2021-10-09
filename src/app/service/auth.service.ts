import { UserLogin } from './../model/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.server + environment.porta;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  getByIdUsuario(id: number) {

    return this.http.get<Usuario>(`${this.url}/usuarios/${id}`);
  }

  login(login: UserLogin): Observable<UserLogin> {

    return this.http.post<UserLogin>(`${this.url}/usuarios/logar`, login);
  }

  cadastro(cadastro: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuarios/cadastrar`, cadastro);
  }

  logado() {
    let ok: boolean = false;

    if(environment.token != '') {
      ok = true;

    }

    return ok;
  }

  likeProduto(idUsuario: number, idProduto: number): Observable<Usuario> {

    return this.http.put<Usuario>(`${this.url}/usuarios/likes_usuario_postagem/likeProduto/${idProduto}/like/${idUsuario}`, this.autorizacao);
  }

}
