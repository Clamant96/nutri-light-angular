import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome = environment.nome;
  foto = environment.foto;
  id = environment.id;
  username = environment.username;

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);

    environment.id = 0;
    environment.nome = '';
    environment.idade = 0;
    environment.peso = 0;
    environment.username = '';
    environment.senha = '';
    environment.altura = 0;
    environment.token = '';
    environment.foto = '';
    environment.imc = 0;
  }

}
