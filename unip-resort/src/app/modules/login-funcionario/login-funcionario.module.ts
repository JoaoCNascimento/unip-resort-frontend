import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFuncionarioRoutingModule } from './login-funcionario-routing.module';
import { LoginFuncionarioComponent } from 'src/app/components/login-funcionario/login-funcionario.component';


@NgModule({
  declarations: [
    LoginFuncionarioComponent
  ],
  imports: [
    CommonModule,
    LoginFuncionarioRoutingModule
  ]
})
export class LoginFuncionarioModule { }
