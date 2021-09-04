import { CategoriaService } from './../service/categoria.service';
import { Produto } from 'src/app/model/Produto';
import { ListaService } from './../service/lista.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { environment } from 'src/environments/environment.prod';
import { Lista } from '../model/Lista';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: UserLogin = new UserLogin();
  listaUsuario: Produto[];
  qtdProdutos: Produto[];

  produtosDaCategoria: Categoria;
  categorias: Categoria[];

  constructor(
    private authService: AuthService,
    private produtosService: ProdutosService,
    private listaService: ListaService,
    private categoriaService: CategoriaService,
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
      environment.imc = this.login.peso / ( this.login.altura * this.login.altura );
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

  gerarLista(idListaUsuario: number) {

    // VERIFICA A QTD DE CATEOGORIAS EXISTENTES
    this.findAllByCategoria();

    // TRAZ OS DADOS DE CADA CATEGORIA PARA POPULAR A TABELA DO USUARIO
    for(let i = 0; i < this.categorias.length; i++) {
      this.findByCategoria(i);

      // NAVEGA ENTRE A LISTA DE PRODUTOS CONTIDOS NA CATEGORIA PARA INSERIR POR CATEGORIA OS PRODUTOS NA LISTA DO USUARIO
      for(let j = 0; j < this.produtosDaCategoria.produtos.length; j++) {
        console.log('Categoria: ');
        console.log(this.produtosDaCategoria.nome);

        console.log('Produto: ');
        console.log(this.produtosDaCategoria.produtos[j].nome);

        /*this.produtosService.adicionarProdutoAListaDoUsuario(this.produtosDaCategoria.produtos[j].id, idListaUsuario).subscribe(() => {
          console.log(`Item ${this.produtosDaCategoria.produtos[j].nome} inserido em sua lista com sucesso`);

        },erro => {
          if(erro.status == 500 || erro.status == 400) {
            alert('Ocorreu um erro ao tentar gera sua lista!');
          }

        });*/

      }

    }

  }

  findByIdListaUsuario() {
    this.listaService.findByIdListaUsuario(environment.id).subscribe((resp: Produto[]) => {
      this.listaUsuario = resp;

      console.log(this.listaUsuario);

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });

  }

  findAllByProdutos() {
    this.produtosService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.qtdProdutos = resp;

    });

  }

  findByCategoria(idCategoria: number) {
    this.categoriaService.findByIdCategoria(idCategoria).subscribe((resp: Categoria) => {
      this.produtosDaCategoria = resp;

    });

  }

  findAllByCategoria() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.categorias = resp;

    });

  }

}
