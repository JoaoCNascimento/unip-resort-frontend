import { Component, OnInit } from '@angular/core';
import { faCheck, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { Reserva } from 'src/app/models/Reserva';
import { ReservasService } from 'src/app/services/api/reservas.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  faCheck = faCheck;
  faTicket = faTicketAlt;
  reservas: Reserva[] = [];

  constructor(
    private rs: ReservasService
  ) { }

  ngOnInit(): void {
    this.getReservas();
  }

  changeStatusChecked(r) {
    this.rs.check(r).subscribe(res => {
      this.getReservas();
    });
  }

  getReservas() {
    this.rs.findAll().subscribe((res: Reserva[]) => {

      res = res.map(r => {
        r.cliente.cpf = r.cliente.cpf.replace('.', '').replace('.','').replace('-', '');
        r.cliente.rg = r.cliente.rg.replace('.', '').replace('.','').replace('-', '');
        return r;
      });

      this.reservas = res;
    })
  }
}
