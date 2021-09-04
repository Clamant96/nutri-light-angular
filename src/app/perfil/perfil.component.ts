import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Produto } from './../model/Produto';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  totalPostagens: number;
  tipoIMC: string;

  postagem: Produto = new Produto();
  usuarioPostagem: Usuario = new Usuario();
  listaDePostagens: Produto[];

  usuarioMensagensPostagem: Usuario[];

  constructor(
    private authService: AuthService,
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == ''){
      this.router.navigate(['/login']);

    }

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {

      if(resp.foto == null) {
        resp.foto = '../../assets/img/person_perfil_vazio.png';

      }

      this.usuario = resp;

      if(environment.imc < 18.5) {
        this.tipoIMC = 'Magreza';

      }else if(environment.imc >= 18.5 && environment.imc <= 24.9) {
        this.tipoIMC = 'Normal';

      }else if(environment.imc >= 25.0 && environment.imc <= 29.9) {
        this.tipoIMC = 'Sobrepeso I';

      }else if(environment.imc >= 30.0 && environment.imc <= 39.9) {
        this.tipoIMC = 'Obesidade II';

      }else if(environment.imc >= 40.0) {
        this.tipoIMC = 'Obesidade Grave III';

      }

      this.findByPostagensUsuario();

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        this.router.navigate(['/login']);

      }

    });

  }

  findByPostagensUsuario() {
    this.produtosService.getAllByUsuarioProduto(this.idUsuario).subscribe((resp: Produto[]) => {
      this.listaDePostagens = resp;

      console.log(this.listaDePostagens);

      this.totalPostagens = this.listaDePostagens.length;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar carregar suas postagens!');

        this.router.navigate(['/login']);

      }

    });

  }

  findByIdPostagem(id: number) {
    this.produtosService.getAllByIdProduto(id).subscribe((resp: Produto) => {
      this.postagem = resp;

      this.authService.getByIdUsuario(resp.usuario.id).subscribe((resp: Usuario) => {
        this.usuarioPostagem = resp;

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao tentar vizualizar a postagem!');

        }

      });

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar abrir a postagem!');

      }

    });

    this.postagem = new Produto();

  }

}
