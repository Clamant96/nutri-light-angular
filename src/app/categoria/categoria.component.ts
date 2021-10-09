import { CategoriaService } from './../service/categoria.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  /* INSTANCIA UM NOVO OBJETO TEMA */
  categoria: Categoria = new Categoria();
  putCategoriaSistema: Categoria = new Categoria();
  /* CRIA UMA VARIAVEL DO TIPO Tema, SE TRATA DE UM ARRAY, RESPOSAVEL POR ARMAZENAR OS DADOS VINDO DE Tema() */
  listaCategoria: Categoria[];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService

  ) { }

  /* AO SER CARREGADO O COMPONENT home, VERIFIQUE A CONDICAO */
  ngOnInit() {
    /* VERIFICA SE O VALOR CONTIDO DENTRO DO TOKEN NO VALOR GLOBAL E IGUAL A VAZIO/NULO */
    /* CASO SEJA, REDIRECIONA O USUARIO AO LOGIN */
    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    /* INICIALIZA O METODO SEMPRE QUE O COMPONENT TEMA FOR CHAMADO */
    this.findAllCategorias();

  }

  ajustar() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: block !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'justify-content: center !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'align-items: center !important;');

    }

  }

  /* CADASTRA UM NOVO TEMA NA BASE DE DADOS */
  cadastrar() {
    /* CHAMA A CLASSE TemaService CRIADA ANTERIORMENTE, ONDE CONTEM OS METODOS COM OS ENDPOINTS PARA MANIPULAR A API */
    /* RECEBE COMO PARAMETRO O OBJETO Tema CONVERSER ESSE DADO TypeScript em um Objeto JavaScrit(JSON)*/
    this.categoriaService.portCategoria(this.categoria).subscribe((resp: Categoria) => {
      /* PEGA ESSE Objeto(JSON) E INSERE DENTRO DO Objeto tema, INSERINDO ESSE DADOS NA BASE DE DADOS */
      this.categoria = resp;
      /* RETORNA UMA RESPOSTA AO USUARIO */
      alert('Tema cadastrado com sucesso.');
      /* SEMPRE QUE HOUVER UM NOVO DADO, ATUALIZE MINHA LISTA DE TEMAS */
      this.findAllCategorias();
      /* INSTANCIA UM NOVO Objeto Tema, PARA QUE POSSA SER ZERADO OS DADOS ANTERIORES E COMECAR UM NOVO CADASTRO */
      this.categoria = new Categoria();

    })

  }

  /* TRAZ TODOS OS DADOS CONTIDOS NA TABELA */
  /* CHAMA A CLASSE TemaService E POR ELE NOS DA ACESSO AO METODO DE findAllTema() CRIANDO DENTRO DELE ONDE NOS POSSIBILITA ESTAR TRAZENDO TODOS OS DADOS CONTADOS NA TABELA TEMA */
  /* CONVERTE ESSE DADOS TypeScript em um Objeto JavaScrip INSERINDO ESSE DADOS DENTRO DO ATRIBUTO listaTema, ARRAY RESPOSAVEL POR ARMAZENAR TODOS OS DADOS DA TELA TEMA */
  /* COM ESSE DADOS EM MAOS, CONSEGUIMOS POR MEIO DE UM FOR(*ngFor) NO HTML, LISTA TODOS ESSE DADOS */
  findAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      /* ARMAZENA OS DADOS VINDOS DA TABELA TEMA, DENTRO DA VARIAVEL QUE E UM ARRAY listaTema[] */
      this.listaCategoria = resp;

    })

  }

  findbyIdCategoria(id: number) {
    this.categoriaService.findByIdCategoria(id).subscribe((resp: Categoria) => {
      this.putCategoriaSistema = resp;

    });

  }

  /* ATUALIZAR CATEGORIA */
  putCategoria() {
    this.categoriaService.putCategoria(this.putCategoriaSistema).subscribe((resp: Categoria) => {
      this.putCategoriaSistema = resp;

      this.findAllCategorias();
      /* INSTANCIA UM NOVO Objeto Tema, PARA QUE POSSA SER ZERADO OS DADOS ANTERIORES E COMECAR UM NOVO CADASTRO */
      this.putCategoriaSistema = new Categoria();

      alert('Categoria atualizada com sucesso!');

    },erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar atualizar a categoria!');

      }

    });
  }

  /* DELETA CATEGORIA */
  deletaCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(() => {

      this.findAllCategorias();

      alert('Categoria excluida com sucesso!');

    });
  }

}
