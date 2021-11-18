import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipe } from '../cpf.pipe';
import { RgPipe } from '../rg.pipe';



@NgModule({
  declarations: [
    CpfPipe,
    RgPipe
  ],
  exports: [
    CpfPipe,
    RgPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
