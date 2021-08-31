import { Component, OnInit } from '@angular/core';
import { faBars, faCheckCircle, faDoorOpen, faEdit, faPhone, faPlus, faTicketAlt, faTrash, faTrashAlt, faUser, faUserCog, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  faPlus = faPlus
  faEdit = faEdit
  faTrash = faTrash
  faUserPlus = faUserPlus
  faUserEdit = faUserEdit
  faDoorOpen = faDoorOpen
  faPhone = faPhone
  faTicket = faTicketAlt
  faCheckOut = faCheckCircle
  faBars = faBars


  constructor() { }

  ngOnInit(): void {
    this.ajustarNavbar();
  }

  /*
  ________________________________
  **********  JQUERY *************

  As funções abaixo servem apenas para estilização da página.

  ** ajustarNavbar **
  Serve para ajustar a navbar de acordo com o tamanho da janela.

  **esconderMenu / revelarMenu**
  Exatamente o que está descrito.
*/

  ajustarNavbar() {
    $(window).resize(() => {
      if ($(window).width() > 900) {
        let menu = $("nav");

        menu.css("display", "flex");
      }
    })
  }

  esconderMenu() {
    $(document).ready(() => {
      $(".close-btn").click(() => {
        let menu = $("nav");

        $(".close-btn").hide();
        menu.animate({ right: -400 }, 'fast')
      })
    })
  }

  revelarMenu() {
    $(document).ready(() => {
      $(".hamburguer").click(() => {
        let menu = $("nav");
        let closebtn = $(".close-btn");

        menu.animate({ right: 0 }, 'fast')
        closebtn.show();
        menu.css("display", "flex");
      })
    })
  }

}

