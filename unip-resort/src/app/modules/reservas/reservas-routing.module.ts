import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinhasReservasComponent } from 'src/app/components/reservas/minhas-reservas/minhas-reservas.component';
import { NovaReservaComponent } from 'src/app/components/reservas/nova-reserva/nova-reserva.component';
import { PerfilComponent } from 'src/app/components/reservas/perfil/perfil.component';
import { ReservasHomeComponent } from 'src/app/components/reservas/reservas-home/reservas-home.component';
import { ReservasComponent } from 'src/app/components/reservas/reservas.component';


const routes: Routes = [
  {
    path: '', component: ReservasComponent, children: [
      { path: '', component: ReservasHomeComponent },
      { path: 'minhas-reservas', component: MinhasReservasComponent },
      { path: 'meu-perfil', component: PerfilComponent },
      { path: 'nova-reserva', component: NovaReservaComponent }
    ]
  },
  {
    path: '**', redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
