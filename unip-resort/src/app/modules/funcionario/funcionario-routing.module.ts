import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from 'src/app/components/funcionario/cadastro/cadastro.component';
import { FuncionarioComponent } from 'src/app/components/funcionario/funcionario.component';
import { DetalhesNovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/detalhes-nova-reserva/detalhes-nova-reserva.component';
import { NovaReservaComponent } from 'src/app/components/funcionario/nova-reserva/nova-reserva.component';
import { PagamentoComponent } from 'src/app/components/funcionario/nova-reserva/pagamento/pagamento.component';
import { ReservaRealizadaComponent } from 'src/app/components/funcionario/nova-reserva/reserva-realizada/reserva-realizada.component';

const routes: Routes = [
  {
    path: '', component: FuncionarioComponent, children: [
      {
        path: 'nova-reserva', component: NovaReservaComponent, children: [
          { path: '', component: DetalhesNovaReservaComponent },
          { path: 'pagamento', component: PagamentoComponent },
          { path: 'reserva-realizada', component: ReservaRealizadaComponent }
        ],
      },
      {
        path: 'cadastrar-cliente', component: CadastroComponent
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
