import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faEdit, faTable, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from 'src/app/models/Cliente';
import { AuthService } from 'src/app/services/api/auth.service';
import { ClienteService } from 'src/app/services/api/cliente.service';

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

  reservas: any = [

  ];

  cliente: Cliente;

  constructor(
    private cs: ClienteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    this.cs.findByEmail().subscribe(
      (res: Cliente) => this.cliente = res
    )
  }

}
