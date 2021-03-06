import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { TermosComponent } from './components/termos/termos.component';
import { AuthGuard } from './guard/auth.guard';


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
      .then(m => m.FuncionarioModule), canActivate: [AuthGuard]
  },

  {
    path: 'termos-de-uso',
    component: TermosComponent  
  },

  {
    path: 'ajuda',
    component: AjudaComponent
  },

  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
