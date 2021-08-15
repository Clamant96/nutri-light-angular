import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.server + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

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

}
