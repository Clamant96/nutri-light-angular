import { MensagemService } from './../service/mensagem.service';
import { Mensagem } from './../model/Mensagem';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { CategoriaService } from './../service/categoria.service';
import { Router } from '@angular/router';
import { ListaService } from './../service/lista.service';
import { Produto } from './../model/Produto';
import { ProdutosService } from './../service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { Lista } from '../model/Lista';
import { environment } from 'src/environments/environment.prod';
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
  tipoIMC: string;

  tipoCategoriaIMC = [' Global', 'Magreza', 'Normal', 'Sobrepeso', 'Obesidade', 'Obesidade Grave'];
  categoriaIMCInserirProduto: string;

  img = environment.foto;
  username = environment.username;
  nome = environment.nome;
  idade = environment.idade;
  peso = environment.peso;
  altura = environment.altura;
  id = environment.id;

  produto: Produto = new Produto();
  listaDeProdutos: Produto[];

  listaUsuario: Produto[];

  listaRecuperadaDaCategoria: Produto[];

  listaDeCategoria: Categoria[];

  categoria: Categoria = new Categoria();

  produtosDaCategoria: Categoria;
  categorias: Categoria[];

  idCategoria: number;

  usuario: Usuario = new Usuario();
  idUsuario: number;
  idUser = environment.id;

  mensagem: Mensagem = new Mensagem();
  minhasPostagens: Produto = new Produto();

  produtoModalDados: Produto = new Produto();
  nomeCriadorPostagem: string;
  mensagemPostagemCriador: string;
  usernameUsuarioModal: string;
  fotoUsuarioModal: string;

  constructor(
    private produtosService: ProdutosService,
    private listaService: ListaService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    //this.findByIdListaUsuario();
    this.findAllByCategorias();
    this.geradorIMC();
    this.findAllByCategoria(this.idListaUsuario);
    this.gerarNovaListaAutomatica(this.id);

  }

  /* TRAZ A LISTA DE TODOS OS PRODUTOS CADASTRADOS NO SISTEMA */
  findAllByProdutos() {
    this.produtosService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  /* TRAZ A LISTA DE TODAS AS CATEGORIAS CADASTRADAS NO SISTEMA */
  findAllByCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  /* TRAZ OS DADOS DE UMA CATEGORIA ESPECIFICA */
  findByIdCategoria() {
    this.categoriaService.findByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* TRAZ OS DADOS DE UM PRODUTO ESPECIFICO */
  findByIdProduto(id: number) {
    this.produtosService.getAllByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

      this.idCategoria = this.produto.categoria.id;
      this.categoriaIMCInserirProduto = this.produto.categoriaTipoIMC;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  /* TRAZ OS DADOS DE UM PRODUTO ESPECIFICO PARA SER APRESENTADO EM UM MODAL */
  findByIdProdutoModal(id: number) {
    this.produtosService.getAllByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModalDados = resp;

      this.usernameUsuarioModal = this.produtoModalDados.usuario.username;
      this.fotoUsuarioModal = this.produtoModalDados.usuario.foto;

      this.nomeCriadorPostagem = this.produtoModalDados.usuario.username;
      this.mensagemPostagemCriador = this.produtoModalDados.nome;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });
  }

  /* TRAZ UMA LISTA COM TODAS AS CATEGORIAS E CHAMA O METODO DE CATEGORIA POR ID, PARA FILTRAR OS PRODUTOS POR CATEGORIA */
  findAllByCategoria(idListaUsuario: number) {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.categorias = resp;

      console.log("QTD categorias: "+ this.categorias.length);

      // TRAZ OS DADOS DE CADA CATEGORIA PARA POPULAR A TABELA DO USUARIO
      for(let i = 0; i < this.categorias.length; i++) {
        /* PESQUISA POR CATEGORIA */
        this.findByCategoria( i + 1, idListaUsuario );

      }

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });

  }

  /* TRAZ OS DADOS DE UMA CATEGORIA ESPECIFICA */
  findByCategoria(idCategoria: number, idListaUsuario: number) {
    this.categoriaService.findByIdCategoria(idCategoria).subscribe((resp: Categoria) => {
      try {
      this.produtosDaCategoria = resp;

      /* ATRIBUE OS PRODUTOS DAQUELA DETERMINADA CADEGORIA AO ARRAY DE PRODUTOS TEMPORARIO */
      this.listaRecuperadaDaCategoria = this.produtosDaCategoria.produtos;

      //console.log('DADOS OBTIDOS DA REQUEST DE CATEGORIA: '+ this.produtosDaCategoria.nome);
      //console.log(this.listaRecuperadaDaCategoria);

      /* ============================= */
      /* === CATEGORIA IMC USUARIO === */
      /* ============================= */
      if(this.imc < 18.5) {
        this.classificacao = 'Magreza';

      }else if(this.imc >= 18.5 && this.imc <= 24.9) {
        this.classificacao = 'Normal';

      }else if(this.imc >= 25.0 && this.imc <= 29.9) {
        this.classificacao = 'Sobrepeso I';

      }else if(this.imc >= 30.0 && this.imc <= 39.9) {
        this.classificacao = 'Obesidade II';

      }else if(this.imc >= 40.0) {
        this.classificacao = 'Obesidade Grave III';

      }

      /* =================================================================== */
      /* == RECURSAO PARA DEFINIR OS PRODUTOS MAIS UTILIZADOS NO SISTEMA === */
      /* =================================================================== */
      for(let i = 0; i < this.listaRecuperadaDaCategoria.length; i++) {
        this.listaRecuperadaDaCategoria[i].listas.sort((a, b) => {
          if(a > b) {
            return -1;
          }
          if(a < b) {
            return 1;
          }
          return 0;
        });

      }

      //console.log('Resultado do filtro: ');
      //console.log(this.listaRecuperadaDaCategoria);

      /* VARIAVEL PARA ARMAZENAR E ENVIAR OS DADOS FILTRADO PARA A LISTA DO USUARIO LOGADO NO SISTEMA */
      let memoria = [];

      /* PARA CADA CATEGORIA SE TEM UMA QTD MAXIMA DE PRODUTOS PERMITIDOS */
      for(let i = 0; i < this.listaRecuperadaDaCategoria.length; i++) {
        // 2 -> proteínas
        // qtd de itens max. 2 itens
        // categoria IMC produto
        if(this.produtosDaCategoria.id == 1 && memoria.length < 2 && this.listaRecuperadaDaCategoria[i].categoriaTipoIMC == this.classificacao) {
          memoria.push(this.listaRecuperadaDaCategoria[i]);

        // 3 -> carboidratos
        // qtd de itens max. 3 itens
        // categoria IMC produto
        }else if(this.produtosDaCategoria.id == 2 && memoria.length < 3 && this.listaRecuperadaDaCategoria[i].categoriaTipoIMC == this.classificacao) {
          memoria.push(this.listaRecuperadaDaCategoria[i]);

        // 5 -> verduras
        // qtd de itens max. 5 itens
        // categoria IMC produto
        }else if(this.produtosDaCategoria.id == 3 && memoria.length < 5 && this.listaRecuperadaDaCategoria[i].categoriaTipoIMC == this.classificacao) {
          memoria.push(this.listaRecuperadaDaCategoria[i]);

        // 3 -> frutas
        // qtd de itens max. 3 itens
        // categoria IMC produto
        }else if(this.produtosDaCategoria.id == 4 && memoria.length < 3 && this.listaRecuperadaDaCategoria[i].categoriaTipoIMC == this.classificacao) {
          memoria.push(this.listaRecuperadaDaCategoria[i]);

        }

      }

      console.log('Tratamento de memoria para envio ao banco: ');
      console.log(memoria);

      /* INSERE OS DADOS OBTIDOS NA LISTA DO USUARIO */
      //this.gerarLista(this.produtosDaCategoria, this.listaRecuperadaDaCategoria, environment.id);
      this.gerarLista(memoria, idListaUsuario);

      memoria = [];

      }catch(e) {
        console.log('Foi identificado um erro!!');
        console.log(e);

      }
    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });

  }

  /* TRAZ A LISTA DE PRODUTOS CADASTRADOS NA LISTA DO USUARIO LOGADO */
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

  /* TRAZ OS DADOS DO USUARIO LOGADO NO SISTEMA */
  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

    });

  }

  /* DEIXA UM LIKE OU REMOTE UM LIKE DE UM DETERMINADO PRODUTO */
  likeProduto(idUsuario: number, idProduto: number) {
    this.authService.likeProduto(idUsuario, idProduto).subscribe(() => {
      this.findAllByProdutos();

    });

  }

  /* GERA O IMC DO USUARIO QUE SE LOGA NO SISTEMA */
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

    this.idUsuario = environment.id;
    this.usuario.id = this.idUsuario;

    console.log("Usuario: ");
    console.log(this.usuario);

    console.log("Usuario enviropment: ");
    console.log(environment.id);

    this.produto.usuario = this.usuario;

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

    this.produto.categoriaTipoIMC = this.tipoIMC;

    /* CHAMA O METODO DE PostagemService E REALIZA UM NOVO (POST), AGORA COM TODOS OS DADOS INSERIDOS */
    this.produtosService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      alert('Postagem realizada com sucesso!');

      this.produto = new Produto();

      this.findAllByProdutos();

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('O correu um erro ao cadastrar o produto');
      }

    });

  }

  /* REALIZA UMA NOVA MENSAGEM EM UMA PRODUTO ESPECIFICO */
  postMensagemProduto(idPostagem: number) {
    this.mensagem.username = environment.username;

    /* ACESSA O OBJETO TEMA(ID), E DENTRO DELE INSERE O DADO VINDO DA OPCAO ESCOLHIDA PELO USUARIO */
    this.minhasPostagens.id = idPostagem;
    /* INSERE O ID DE TEMA DENTRO DE POSTAGEM(TEMA) */
    this.mensagem.produto = this.minhasPostagens;

    this.mensagemService.postMensagem(this.mensagem).subscribe((resp: Mensagem) => {
      this.mensagem = resp;

      this.findAllByProdutos();

      this.mensagem = new Mensagem();

    }, erro => {
      if(erro.status == 500) {
        alert('O correu um erro ao tentar realizar o comentarios!');

      }

    });

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

  /* ADICIONA UM PRODUTO ESPECIFICO A LISTA DO USUARIO LOGADO */
  adicionarProduto(idProduto: number, idListaUsuario: number) {

    /* ============================= */
    /* === CATEGORIA IMC USUARIO === */
    /* ============================= */
    if(this.imc < 18.5) {
      this.classificacao = 'Magreza';

    }else if(this.imc >= 18.5 && this.imc <= 24.9) {
      this.classificacao = 'Normal';

    }else if(this.imc >= 25.0 && this.imc <= 29.9) {
      this.classificacao = 'Sobrepeso I';

    }else if(this.imc >= 30.0 && this.imc <= 39.9) {
      this.classificacao = 'Obesidade II';

    }else if(this.imc >= 40.0) {
      this.classificacao = 'Obesidade Grave III';

    }

    this.produtosService.getAllByIdProduto(idProduto).subscribe((resp: Produto) => {
      this.produto = resp;

      console.log(this.produto.categoriaTipoIMC);
      console.log(this.classificacao);

      if(this.produto.categoriaTipoIMC == this.classificacao) {
        this.produtosService.adicionarProdutoAListaDoUsuario(idProduto, idListaUsuario).subscribe(() => {
          this.findByIdListaUsuario();

          alert('Produto adicionado com sucesso de sua lista!');

        }, erro => {
          if(erro.status == 500 || erro.status == 400) {
            alert('Ocorreu um erro ao adicionar o produto!');

          }

        });

      }else {
        alert('Esse produto não pode ser associado a sua lista devido ao seu IMC!!');

      }

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        console.log('Ocorreu um erro ao trazer os dados!');

      }

    });

  }

  /* REMOVE UM PRODUTO ESPECIFICO A LISTA DO USUARIO LOGADO */
  removerProduto(idProduto: number, idListaUsuario: number) {
    this.produtosService.removerProdutoAListaDoUsuario(idProduto, idListaUsuario).subscribe(() => {
      this.findByIdListaUsuario();

      alert('Produto removido com sucesso de sua lista!');

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao remover o produto!');

      }

    });

  }

  /* ATUALIZA UMA POSTAGEM NA BASE DE DADOS */
  atualizar() {
    this.categoria.id = this.idCategoria;
    this.usuario.id = environment.id;

    this.produto.usuario = this.usuario;
    this.produto.categoria = this.categoria;
    this.produto.categoriaTipoIMC = this.categoriaIMCInserirProduto;

    console.log('OBJ ATUALIZADO: ');
    console.log(this.produto)
    if(this.usuario.id == this.produto.usuario.id) {
      this.produtosService.putProduto(this.produto).subscribe((resp: Produto) => {
        this.produto = resp;

        alert('Postagem atualizada com sucesso!');

        this.findByIdListaUsuario();
        this.findAllByProdutos();

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao atualizar o produto!');
          console.log(erro)

        }

      });

    }else {
      alert('Essa postagem so pode ser editada pelo criador dela!!');

    }

  }

  /* GERA A LISTA DO USUARIO */
  gerarLista(produtosSelecionados: Produto[], idListaUsuario: number/*categoria: Categoria, listaProdutos: Produto[], idListaUsuario: number*/) {

    /*console.log("Qtd categorias: "+ this.listaDeCategoria.length);

    let contador = 0;
    let maximo = 0;

    if(categoria.id == 1) {
      maximo = 1;

    }else if(categoria.id == 2) {
      maximo = 2;

    }else if(categoria.id == 3) {
      maximo = 4;

    }else if(categoria.id == 4) {
      maximo = 2;

    }

    // POR MEIO DO ARRAY RECEBIDO, NAVEGA ITEM A ITEM PARA INSERIR POR CATEGORIA NA LISTA DO USUARIO
    for(let i = 0; i < listaProdutos.length; i++) {

      // VERIFICA A LISTA DO USUARIO PARA GARANTIR QUE AS REGRAS SEJAM RESPEITADAS
      this.listaService.findByIdListaUsuario(this.idListaUsuario).subscribe((resp: Produto[]) => {
        this.listaUsuario = resp;

        console.log(this.listaUsuario);

        for(let j = 0; j < this.listaUsuario.length; j++) {
          if(this.listaUsuario[j].categoria.id == categoria.id) {
            console.log('Categoria '+ categoria.id +' localizado!!');
            contador++;
          }

        }

        console.log('Contador: ');
        console.log(contador);

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          console.log('Ocorreu um erro ao trazer os dados!');

        }

      });

      if(contador <= 1) {
        console.log("QTD: ");
        console.log(contador);
        this.produtosService.adicionarProdutoAListaDoUsuario(listaProdutos[i].id, idListaUsuario).subscribe(() => {
          console.log(`Item ${listaProdutos[i].id} inserido em sua lista com sucesso`);

        },erro => {
          if(erro.status == 500 || erro.status == 400) {
            alert('Ocorreu um erro ao tentar gera sua lista!');
          }

        });

      }

    }*/

    /* NAVEGA DENTRO DA LISTA DE MEMORIA FILTRADO, PASSANDO COMO PARAMETRO O ID DO PRODUTO E O ID DA LISTA DO USUARIO, QUE E O MESMO ID DO USUARIO CADASTRADO NO SISTEMA */
    for(let i = 0; i < produtosSelecionados.length; i++) {
      this.produtosService.adicionarProdutoAListaDoUsuario(produtosSelecionados[i].id, idListaUsuario).subscribe(() => {
        console.log(`Item ${produtosSelecionados[i].nome} inserido em sua lista com sucesso`);

      },erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao tentar gera sua lista!');
        }

      });

    }

    this.findByIdListaUsuario();

  }

  removerProdutosDaListaDoUsuario(idUsuario: number) {
    for(let i = 0; i < this.listaUsuario.length; i++) {
      this.produtosService.removerProdutoAListaDoUsuario(this.listaUsuario[i].id, idUsuario).subscribe(() => {

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao remover o produto!');

        }

      });

    }

    this.findByIdListaUsuario();
    this.findByIdListaUsuario();
    this.findByIdListaUsuario();

  }

  gerarNovaListaAutomatica(idListaUsuario: number) {
    this.findAllByCategoria(idListaUsuario);

  }

}
