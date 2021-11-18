import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Components
import { FuncionarioComponent } from 'src/app/components/funcionario/funcionario.component';
import { NovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/nova-reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalhesNovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { ReservaRealizadaComponent } from 'src/app/components/funcionario/nova-reserva/reserva-realizada/reserva-realizada.component';
import { CadastroComponent } from 'src/app/components/funcionario/cadastro/cadastro.component';
import { AdministrarReservasComponent } from 'src/app/components/funcionario/administrar-reservas/administrar-reservas.component';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';

@NgModule({
  declarations: [
    FuncionarioComponent,
    NovaReservaComponent,
    DetalhesNovaReservaComponent,
    ReservaRealizadaComponent,
    CadastroComponent,
    AdministrarReservasComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PipesModule
  ]
})
export class FuncionarioModule { }
