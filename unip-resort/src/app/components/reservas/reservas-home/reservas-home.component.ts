import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faQuestion, faTable, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reservas-home',
  templateUrl: './reservas-home.component.html',
  styleUrls: ['./reservas-home.component.css']
})
export class ReservasHomeComponent implements OnInit {

  faTable = faTable
  faUser = faUser
  faDoor = faDoorOpen
  faQuestion = faQuestion

  suite: any = {
    "img": "F://projetos//unip resort//ext_src//quartos_hotel//quarto (1).jpg",
    "categoria": "Suíte Master",
    "valor": "280",
    "descricao": "Cama de casal, banheira..."
  }

  constructor() { }

  ngOnInit(): void {
  }

}
