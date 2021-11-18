import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Reserva } from 'src/app/models/Reserva';
import { ReservasService } from 'src/app/services/api/reservas.service';

@Component({
  selector: 'app-administrar-reservas',
  templateUrl: './administrar-reservas.component.html',
  styleUrls: ['./administrar-reservas.component.css']
})
export class AdministrarReservasComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  reservas = [];

  constructor(
    private rs: ReservasService
  ) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas() {
    this.rs.findAll().subscribe((res: Reserva[]) => {
      res.map(r => r.status = false)
      this.reservas = res;
    })
  }

}
