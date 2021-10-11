import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faDoorOpen, faQuestion, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { Quarto } from 'src/app/models/Quarto';
import { QuartosApiService } from 'src/app/services/quartos-api.service';

@Component({
  selector: 'app-reservas-home',
  templateUrl: './reservas-home.component.html',
  styleUrls: ['./reservas-home.component.css']
})
export class ReservasHomeComponent implements OnInit {

  imageSource;
  faTable = faTable
  faUser = faUser
  faDoor = faDoorOpen
  faQuestion = faQuestion

  quartos: Quarto[];

  constructor(
    private quartoApiService: QuartosApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.quartoApiService.getQuartos().subscribe((res: any) => {
      return;

      res.map(e => {
        console.log(e.id)
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(e.foto);
        return e;
      });

      this.quartos = res;
    })
  }

}
