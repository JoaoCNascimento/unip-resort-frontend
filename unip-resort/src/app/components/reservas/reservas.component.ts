import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faBars, faDoorOpen, faHotel, faQuestion, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import * as $ from "jquery";
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  faHotel = faHotel
  faTable = faTable
  faUser = faUser
  faDoor = faDoorOpen
  faQuestion = faQuestion
  faBars = faBars
  faArrow = faArrowLeft

  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.ajustarNavbar();
  }

  back() {
    this.location.back();
  }

  exit() {
    this.authService.setToken();
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
        let menu = $("#menu");

        menu.css("display", "flex");
      }
    })
  }

  esconderMenu() {
    $(document).ready(() => {
      $(".close-btn").click(() => {
        let menu = $("#menu");

        $(".close-btn").hide();
        menu.animate({ right: -400 }, 'fast')
      })
    })
  }

  revelarMenu() {
    $(document).ready(() => {
      $(".hamburguer").click(() => {
        let menu = $("#menu");
        let closebtn = $(".close-btn");

        menu.animate({ right: 0 }, 'fast')
        closebtn.show();
        menu.css("display", "flex");
      })
    })
  }
}
