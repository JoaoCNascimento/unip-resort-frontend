import { AfterContentInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Categoria } from "src/app/models/Categoria";
import { Quarto } from "src/app/models/Quarto";
import { CategoriaService } from "src/app/services/api/categoria.service";
import { QuartoService } from "src/app/services/api/quartos.service";

@Component({
  selector: "app-detalhes-nova-reserva",
  templateUrl: "./detalhes-nova-reserva.component.html",
  styleUrls: ["./detalhes-nova-reserva.component.css"],
})
export class DetalhesNovaReservaComponent implements OnInit {
  form: FormGroup;
  valorTotal: number = 0;
  valorTotalDescricao: string = "R$ ";
  valorTaxa: number = 0;
  imageSource: String = "";

  categoria: Categoria = {
    id: 1,
    nome: "Suíte Master",
    descricao: "Cama de casal, blá blá blá",
    imageUrl:
      "data:image/jpeg;base64,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",
    precoDiaria: 225,
  };

  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cs: CategoriaService,
    private qs: QuartoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.configurateForm();
    this.getCategorias();
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
    this.form = this.fb.group({
      categoria: [, []],
      qtdHospedes: [
        1,
        [Validators.min(1), Validators.max(6), Validators.required],
      ],
      dataCheckIn: [null, []],
      dataCheckOut: [null, []],
      cupom: [null, []],
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
