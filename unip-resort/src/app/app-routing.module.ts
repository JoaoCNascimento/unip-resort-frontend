import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  },

  {
    path: 'cadastrar',
    loadChildren: () => import('./modules/cadastro/cadastro.module')
      .then(m => m.CadastroModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module')
      .then(m => m.LoginModule)
  },

  {
    path: 'login-funcionario',
    loadChildren: () => import('./modules/login-funcionario/login-funcionario.module')
      .then(m => m.LoginFuncionarioModule)
  },

  {
    path: 'reservas',
    loadChildren: () => import('./modules/reservas/reservas.module')
      .then(m => m.ReservasModule)
  },

  {
    path: 'funcionario',
    loadChildren: () => import('./modules/funcionario/funcionario.module')
      .then(m => m.FuncionarioModule)
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
