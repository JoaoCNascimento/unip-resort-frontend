import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { Quarto } from 'src/app/models/Quarto';
import { Reserva } from 'src/app/models/Reserva';
import { CategoriaService } from 'src/app/services/api/categoria.service';
import { QuartoService } from 'src/app/services/api/quartos.service';
import { ReservasService } from 'src/app/services/api/reservas.service';

@Component({
  selector: 'app-administrar-reservas',
  templateUrl: './administrar-reservas.component.html',
  styleUrls: ['./administrar-reservas.component.css']
})
export class AdministrarReservasComponent implements OnInit {

  form: FormGroup;
  categorias: Categoria[];
  categoria: Categoria;
  quartos: Quarto[];
  valorTotal: number = 0;
  valorTotalDescricao: string = "R$ ";
  valorTaxa: number = 0;
  imageSource: String = "";

  faEdit = faEdit;
  faTrash = faTrash;

  reservas = [];

  constructor(
    private rs: ReservasService,
    private router: Router,
    private cs: CategoriaService,
    private qs: QuartoService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getReservas();
    this.getCategorias();
    this.configurateForm();
  }

  getReservas() {
    this.rs.findAll().subscribe((res: Reserva[]) => {
      this.reservas = res;
    })
  }

  getCategorias() {
    this.cs.findAll().subscribe((res) => {
      let categorias = res;
      if (categorias.length === 0)
      {
        this.router.navigate(['/'], { relativeTo: this.route.root });
        return this.toastrService.error('Não há categorias cadastradas no sistema.');
      } 
        
      this.qs.findAll().subscribe((_quartos: Quarto[]) => {
        let _categorias = categorias.map((c) => {

          let listaQuartos = _quartos.filter((q) => {
            return q.categoria.nome === c.nome;
          });
          
          if (listaQuartos.length >= 1) {
            c.status = true;
            return c;
          }

          c.status = false;
          return undefined;
        });

        _categorias = _categorias.filter(c => {return c !== undefined});
        this.categorias = _categorias;
        this.changeCategoria(this.route.snapshot.params["id"] | this.categorias[0].id);
      });
    });
  }

  configurateForm() {
    let pattern: RegExp = new RegExp('^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$');

    this.form = this.fb.group({
      categoria: [, [Validators.required]],
      qtdHospedes: [
        1,
        [Validators.min(1), Validators.max(6), Validators.required],
      ],
      dataCheckIn: [null, [Validators.required, Validators.pattern(pattern)]],
      dataCheckOut: [null, [Validators.required, Validators.pattern(pattern)]],
    });
  }

  reservaRealizada() {
    this.router.navigate(["reservas/nova-reserva/reserva-realizada"], {
      relativeTo: this.route.root,
    });
  }

  calcularValorDiaria() {
    if (
      this.form.get("dataCheckIn").value &&
      this.form.get("dataCheckOut").value
    ) {
      let checkIn = moment(this.form.get("dataCheckIn").value);
      let checkOut = moment(this.form.get("dataCheckOut").value);
      let days = checkOut.diff(checkIn, "days") + 1;

      if(!checkOut.isSameOrAfter(checkIn)) {
        return alert('Datas inválidas.');
      }

      if (this.form.get("qtdHospedes").value) {
        let qtdHospedes = this.form.get("qtdHospedes").value;
        
        if (qtdHospedes > 0) {
          this.valorTaxa = (Number(this.categoria.precoDiaria) / 10) * qtdHospedes;
        }
      }

      this.valorTotal = Number(this.categoria.precoDiaria) * days;
    }
  }

  changeCategoria(categoriaId?: Number) {
    let categoria;

    if (categoriaId) {
      categoria = this.categorias[this.categorias.findIndex((c) => c.id == categoriaId)];
      if (categoria === null || categoria === undefined) {
        this.categoria = this.categorias[0];
      }
      else
        this.categoria = categoria;
        
    } else {
      categoria =
        this.categorias[
          this.categorias.findIndex(
            (c) => c.nome == this.form.get("categoria").value
          )
        ];
      this.categoria = categoria;
    }

    this.form.get("categoria").setValue(this.categoria.nome);
    this.calcularValorDiaria();
  }

  revealModal() {
    const modal: any = document.querySelectorAll(".modal-container")[0];
    const modalBody: any = document.querySelectorAll(".modal-body")[0];

    modal.style.cssText = "display: flex";
    setTimeout(() => {
      modalBody.style.cssText = "margin-top: 0%";
    }, 150);
  }

  hideModal() {
    const modal: any = document.querySelectorAll(".modal-container")[0];
    const modalBody: any = document.querySelectorAll(".modal-body")[0];

    setTimeout(() => {
      modalBody.style.cssText = "margin-top: -105%";
    }, 50);
    setTimeout(() => {
      modal.style.cssText = "display: none";
    }, 400);
  }
}
