import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reserva-realizada',
  templateUrl: './reserva-realizada.component.html',
  styleUrls: ['./reserva-realizada.component.css']
})
export class ReservaRealizadaComponent implements OnInit {

  faCheck = faCheckCircle;
  faPrint = faPrint;
  faDownload = faDownload;

  constructor() { }

  ngOnInit(): void {
  }

}
