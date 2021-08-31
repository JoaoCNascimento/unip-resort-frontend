import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Components
import { FuncionarioComponent } from 'src/app/components/funcionario/funcionario.component';

@NgModule({
  declarations: [
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FontAwesomeModule
  ]
})
export class FuncionarioModule { }
