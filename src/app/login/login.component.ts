import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  logar() {
    this.authService.login(this.login).subscribe((resp: UserLogin) => {
      this.login = resp;

      environment.id = this.login.id;
      environment.nome = this.login.nome;
      environment.idade = this.login.idade;
      environment.peso = this.login.peso;
      environment.username = this.login.username;
      environment.senha = this.login.senha;
      environment.altura = this.login.altura;
      environment.token = this.login.token;
      environment.foto = this.login.foto;
      environment.imc = this.login.imc;
      environment.lista = this.login.lista.id;

      console.log(environment.id);
      console.log(environment.nome);
      console.log(environment.idade);
      console.log(environment.peso);
      console.log(environment.username);
      console.log(environment.senha);
      console.log(environment.altura);
      console.log(environment.token);
      console.log(environment.foto);
      console.log(environment.imc);

      this.router.navigate(['/home']);

    }, erro => {
      if(erro.status == 500) {
        alert('Usuario ou senha estao incorretos!');

      }

    });

  }

}
