import { Router } from '@angular/router';
import { ListaService } from './../service/lista.service';
import { Produto } from './../model/Produto';
import { ProdutosService } from './../service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { Lista } from '../model/Lista';
import { environment } from 'src/environments/environment';

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

  constructor(
    private produtosService: ProdutosService,
    private listaService: ListaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    this.findByIdListaUsuario();
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

}
