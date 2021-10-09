import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from './../../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutosService } from 'src/app/service/produtos.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();

  categoria: Categoria = new Categoria();
  idCategoria: number;
  listaDeCategorias: Categoria[];

  constructor(
    private produtoService: ProdutosService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    /* RECEBE O NOVO ID DE ACORDO COM A OPCAO ESCOLHIDA PELO USUARIO AO ATUALIZAR O DADO DE TEMA */
    this.idCategoria = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.idCategoria);
    this.findAllTemas();

  }

  /* LOCALIZA UMA POSTAGEM POR MEIO DO ID */
  findByIdPostagem(id: number) {
    this.produtoService.getAllByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  /* LOCALIZA UM TEMA POR MEIO DO ID */
  findByIdTema() {
    this.categoriaService.findByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* TRAZ TODOS OS TEMAS CONTIDOS NA BASE DE DADOS */
  findAllTemas() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategorias = resp;

    })

  }

  /* ATUALIZA UMA POSTAGEM NA BASE DE DADOS */
  atualizar() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      alert('Postagem atualizada com sucesso!');

      this.router.navigate(['/home']);

    })

  }

  ajustar() {
    if(window.document.URL != '/home') {
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'display: block !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'justify-content: center !important;');
      window.document.querySelector('.botao-postagem')?.setAttribute('style', 'align-items: center !important;');

    }

  }

}
