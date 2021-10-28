import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Components
import { FuncionarioComponent } from 'src/app/components/funcionario/funcionario.component';
import { NovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/nova-reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalhesNovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { PagamentoComponent } from 'src/app/components/funcionario/nova-reserva/pagamento/pagamento.component';
import { ReservaRealizadaComponent } from 'src/app/components/funcionario/nova-reserva/reserva-realizada/reserva-realizada.component';
import { CadastroComponent } from 'src/app/components/funcionario/cadastro/cadastro.component';

@NgModule({
  declarations: [
    FuncionarioComponent,
    NovaReservaComponent,
    DetalhesNovaReservaComponent,
    PagamentoComponent,
    ReservaRealizadaComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class FuncionarioModule { }
