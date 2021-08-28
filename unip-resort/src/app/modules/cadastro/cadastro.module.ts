import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule
  ]
})
export class CadastroModule { }
