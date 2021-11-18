import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasComponent } from 'src/app/components/reservas/reservas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from 'src/app/components/reservas/perfil/perfil.component';
import { MinhasReservasComponent } from 'src/app/components/reservas/minhas-reservas/minhas-reservas.component';
import { ReservasHomeComponent } from 'src/app/components/reservas/reservas-home/reservas-home.component';
import { NovaReservaComponent } from 'src/app/components/reservas/nova-reserva/nova-reserva.component';
import { DetalhesNovaReservaComponent } from 'src/app/components/reservas/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { ReservaRealizadaComponent } from 'src/app/components/reservas/nova-reserva/reserva-realizada/reserva-realizada.component';

@NgModule({
  declarations: [
    ReservasComponent,
    PerfilComponent,
    MinhasReservasComponent,
    NovaReservaComponent,
    ReservasHomeComponent,
    DetalhesNovaReservaComponent,
    ReservaRealizadaComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class ReservasModule { }
