import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/api/cliente.service';

@Component({
  selector: 'app-administrar-clientes',
  templateUrl: './administrar-clientes.component.html',
  styleUrls: ['./administrar-clientes.component.css']
})
export class AdministrarClientesComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  clientes: Cliente[] = [];

  constructor(
    private cs:ClienteService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  configurateForm(id) {
    
  }

  getClientes() {
    this.cs.findAll().subscribe(
      (res:Cliente[])=> {this.clientes = res}
    )
  }
}
