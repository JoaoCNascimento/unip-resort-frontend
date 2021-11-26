import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faEdit, faTable, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from 'src/app/models/Cliente';
import { Reserva } from 'src/app/models/Reserva';
import { AuthService } from 'src/app/services/api/auth.service';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { ReservasService } from 'src/app/services/api/reservas.service';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.css']
})
export class MinhasReservasComponent implements OnInit {

  faTable = faTable
  faUser = faUser
  faDoor = faDoorOpen
  faTrash = faTrash
  faEdit = faEdit

  reservas: Reserva[] = [];

  cliente: Cliente;

  constructor(
    private cs: ClienteService,
    private rs: ReservasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getReservas() {
    this.rs.findAll().subscribe(res => {
      this.reservas = res;
    });
  }

  getCliente() {
    this.cs.findByEmail().subscribe(
      (res: Cliente) => {
        this.cliente = res;
      this.getReservas();
      }
    )
  }

}
