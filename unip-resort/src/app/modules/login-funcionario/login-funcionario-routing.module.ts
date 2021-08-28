import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFuncionarioComponent } from 'src/app/components/login-funcionario/login-funcionario.component';

const routes: Routes = [
  { path: '', component: LoginFuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginFuncionarioRoutingModule { }
