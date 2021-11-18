import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinhasReservasComponent } from 'src/app/components/reservas/minhas-reservas/minhas-reservas.component';
import { DetalhesNovaReservaComponent } from 'src/app/components/reservas/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { NovaReservaComponent } from 'src/app/components/reservas/nova-reserva/nova-reserva.component';
import { ReservaRealizadaComponent } from 'src/app/components/reservas/nova-reserva/reserva-realizada/reserva-realizada.component';
import { PerfilComponent } from 'src/app/components/reservas/perfil/perfil.component';
import { ReservasHomeComponent } from 'src/app/components/reservas/reservas-home/reservas-home.component';
import { ReservasComponent } from 'src/app/components/reservas/reservas.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


const routes: Routes = [
  {
    path: '', component: ReservasComponent, children: [
      { path: '', component: ReservasHomeComponent },
      { path: 'minhas-reservas', canActivate: [AuthGuard], component: MinhasReservasComponent },
      { path: 'meu-perfil', canActivate: [AuthGuard], component: PerfilComponent },
      {
        path: 'nova-reserva', canActivate: [AuthGuard], component: NovaReservaComponent, children: [
          { path: 'reserva-realizada', component: ReservaRealizadaComponent },
          { path: '', component: DetalhesNovaReservaComponent },
          { path: ':id', component: DetalhesNovaReservaComponent },
        ]
      }
    ]
  },
  {
    // path: '**', redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
