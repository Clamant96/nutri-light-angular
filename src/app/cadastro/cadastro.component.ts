import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastro: Usuario = new Usuario();
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  cadastrar() {
    if(this.cadastro.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estao incorretas!');

    }else {
      // IMC = Peso ÷ (Altura × Altura)
      // IMC = 80 kg ÷ (1,80 m × 1,80 m) = 24,69 kg/m2 (Peso ideal)

      this.cadastro.imc = this.cadastro.peso / (this.cadastro.altura * this.cadastro.altura);

      console.log("Calculo IMC: "+ this.cadastro.imc);

      this.authService.cadastro(this.cadastro).subscribe((resp: Usuario) => {
        this.cadastro = resp;

        this.router.navigate(['/login']);

        this.alertas.showAlertSuccess('Usuario cadastrodo com sucesso!');

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          this.alertas.showAlertDanger('Ocorreu um erro ao realizar o cadastrar!');

        }

      });

    }

  }

  /* ANIMACAO */
  botaoCadastrarAnimacaoOver(){
    window.document.querySelector('#botaoCadastrar')?.setAttribute('style', 'background-color: #c3c3c3 !important;')

  }

  /* ANIMACAO */
  botaoCadastrarAnimacaoOut(){
    window.document.querySelector('#botaoCadastrar')?.setAttribute('style', 'background-color: var(--background-color-button) !important;')

  }

}
