import { Component, OnInit } from '@angular/core';
import { faBarcode, faCreditCard, faMoneyBill, faQrcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  faCreditCard = faCreditCard;
  faQrCode = faQrcode;
  faBarCode = faBarcode;

  constructor() { }

  ngOnInit(): void {
  }

}
