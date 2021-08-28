import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faEdit, faTable, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

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

  usuario: any = {
    nome: "João"
  };

  constructor() { }

  ngOnInit(): void {

  }

}
