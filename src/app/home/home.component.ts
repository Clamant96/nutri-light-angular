import { CategoriaService } from './../service/categoria.service';
import { Router } from '@angular/router';
import { ListaService } from './../service/lista.service';
import { Produto } from './../model/Produto';
import { ProdutosService } from './../service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { Lista } from '../model/Lista';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idListaUsuario = environment.lista;
  imc = environment.peso / (environment.altura * environment.altura);
  imcMemoria: string;
  classificacao: string;
  obesidade: string;

  img = environment.foto;
  username = environment.username;
  nome = environment.nome;
  idade = environment.idade;
  peso = environment.peso;
  altura = environment.altura;

  produto: Produto = new Produto();
  listaDeProdutos: Produto[];

  listaUsuario: Produto[];

  listaDeCategoria: Categoria[];

  categoria: Categoria = new Categoria();

  idCategoria: number;

  constructor(
    private produtosService: ProdutosService,
    private listaService: ListaService,
    private categoriaService: CategoriaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    this.findByIdListaUsuario();
    this.findAllByCategorias();
    this.geradorIMC();

  }

  findAllByProdutos() {
    this.produtosService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  findAllByCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  findByIdCategoria() {
    this.categoriaService.findByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  findByIdProduto(id: number) {
    this.produtosService.getAllByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  findByIdListaUsuario() {
    this.listaService.findByIdListaUsuario(this.idListaUsuario).subscribe((resp: Produto[]) => {
      this.listaUsuario = resp;

      console.log(this.listaUsuario);

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });

  }

  geradorIMC() {
    /*
      IMC	CLASSIFICAÇÃO	OBESIDADE (GRAU)
      MENOR QUE 18,5	MAGREZA	0
      ENTRE 18,5 E 24,9	NORMAL	0
      ENTRE 25,0 E 29,9	SOBREPESO	I
      ENTRE 30,0 E 39,9	OBESIDADE	II
      MAIOR QUE 40,0	OBESIDADE GRAVE	III
    */

    this.imcMemoria = this.imc.toFixed(2);

    if(this.imc < 18.5) {
      this.classificacao = 'Magreza';
      this.obesidade = '0';

    }else if(this.imc >= 18.5 && this.imc <= 24.9) {
      this.classificacao = 'Normal';
      this.obesidade = '0';

    }else if(this.imc >= 25.0 && this.imc <= 29.9) {
      this.classificacao = 'Sobrepeso I';
      this.obesidade = '0';

    }else if(this.imc >= 30.0 && this.imc <= 39.9) {
      this.classificacao = 'Obesidade II';
      this.obesidade = '0';

    }else if(this.imc >= 40.0) {
      this.classificacao = 'Obesidade Grave III';
      this.obesidade = '0';

    }

  }

  /* INSERE OS DADOS NA BASE DE DEDOS */
  publicar() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    /* CHAMA O METODO DE PostagemService E REALIZA UM NOVO (POST), AGORA COM TODOS OS DADOS INSERIDOS */
    this.produtosService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      alert('Postagem realizada com sucesso!');

      this.produto = new Produto();

      this.findAllByProdutos();

    })

  }

  publicarOver() {
    window.document.querySelector('#publicacao')?.setAttribute('style', 'background-color: var(--button-ok) !important;');

  }

  publicarOut() {
    window.document.querySelector('#publicacao')?.setAttribute('style', 'background-color: var(--background-color-button) !important;');

  }

  remover() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: none !important;');

    }

  }

  adicionarProduto(idProduto: number, idListaUsuario: number) {
    this.produtosService.adicionarProdutoAListaDoUsuario(idProduto, idListaUsuario).subscribe(() => {
      this.findByIdListaUsuario();

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao adicionar o produto!');

      }

    });

  }

  removerProduto(idProduto: number, idListaUsuario: number) {
    this.produtosService.removerProdutoAListaDoUsuario(idProduto, idListaUsuario).subscribe(() => {
      this.findByIdListaUsuario();

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao remover o produto!');

      }

    });

  }

}
