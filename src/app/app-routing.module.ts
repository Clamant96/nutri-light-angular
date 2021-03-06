import { UsuarioComponent } from './editar/usuario/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProdutoComponent } from './editar/produto/produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'produto-edit/:id', component: ProdutoComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'editar-perfil/:id', component: UsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
