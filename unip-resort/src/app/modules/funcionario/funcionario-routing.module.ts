import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarClientesComponent } from 'src/app/components/funcionario/administrar-clientes/administrar-clientes.component';
import { AdministrarReservasComponent } from 'src/app/components/funcionario/administrar-reservas/administrar-reservas.component';
import { CadastroComponent } from 'src/app/components/funcionario/cadastro/cadastro.component';
import { CheckComponent } from 'src/app/components/funcionario/check/check.component';
import { FuncionarioComponent } from 'src/app/components/funcionario/funcionario.component';
import { DetalhesNovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { NovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/nova-reserva.component';
import { ReservaRealizadaComponent } from 'src/app/components/funcionario/nova-reserva/reserva-realizada/reserva-realizada.component';

const routes: Routes = [
  {
    path: '', component: FuncionarioComponent, children: [
      {
        path: 'nova-reserva', component: NovaReservaComponent, children: [
          { path: 'reserva-realizada', component: ReservaRealizadaComponent },
          { path: '', component: DetalhesNovaReservaComponent },
          { path: ':id', component: DetalhesNovaReservaComponent}
        ],
      },
      {
        path: 'cadastrar-cliente', component: CadastroComponent
      },
      {
        path: 'reservas', component: AdministrarReservasComponent
      },
      {
        path: 'administrar-clientes', component: AdministrarClientesComponent
      },
      {
        path: 'check', component: CheckComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
