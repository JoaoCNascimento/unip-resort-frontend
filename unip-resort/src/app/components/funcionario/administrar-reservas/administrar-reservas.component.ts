import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { Cliente } from 'src/app/models/Cliente';
import { Quarto } from 'src/app/models/Quarto';
import { Reserva } from 'src/app/models/Reserva';
import { CategoriaService } from 'src/app/services/api/categoria.service';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { QuartoService } from 'src/app/services/api/quartos.service';
import { ReservasService } from 'src/app/services/api/reservas.service';

@Component({
  selector: 'app-administrar-reservas',
  templateUrl: './administrar-reservas.component.html',
  styleUrls: ['./administrar-reservas.component.css']
})
export class AdministrarReservasComponent implements OnInit {

  cpf: string = '';
  reserva: Reserva = undefined;
  cliente = undefined;
  form: FormGroup;
  categorias: Categoria[];
  categoria: Categoria = {
    id: 0,
    descricao: 'Nenhuma categoria',
    imageUrl: '/assets/img-empty.png',
    nome: 'Nenhuma Categoria',
    precoDiaria: 0
  };
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
    private clis: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getReservas();
    this.getCategorias();
    this.configurateForm();
  }

  deleteReserva(id) {
    if(confirm('Deseja realmente excluir a reserva de ID: ' + id + '?'))
      return this.rs.delete(id).subscribe(res => {
        this.getReservas();
      });

    this.toastrService.info('Exclusão cancelada.');
  }

  getReservas() {
    this.rs.findAll().subscribe((res: Reserva[]) => {
      this.reservas = res.map(r => {
        r.cliente.cpf = r.cliente.cpf.replace(".", "").replace(".", "").replace("-", "");
        r.cliente.rg = r.cliente.rg.replace(".", "").replace(".", "").replace("-", "");
        return r;
      });
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
        let _categorias = categorias.map((c:Categoria) => {

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
        this.changeCategoria(this.categorias[0].id);
      });
    });
  }

  onSubmit() {
    if (this.cliente === undefined || this.cliente === null)
      return this.toastrService.warning("Nenhum cliente inserido.");

    if (this.form.invalid) {
      this.toastrService.warning(
        "Verique se os campos foram preenchidos corretamente.",
        "Formulário inválido..."
      );
      return this.form.markAllAsTouched();
    }

    // EU SEI, isso aqui tá terrível...
    // Se alguém estiver vendo isso, saiba que quando fiz isso faltavam 2 dias para entregar o trabalho.
    this.qs.findAll().subscribe((_quartos: Quarto[]) => {
      let reserva: Reserva = Object.assign({}, this.form.value);
      reserva.cliente = this.cliente.id;
      reserva.valor = undefined;
      reserva.categoria = undefined;
      // TO DO - implementar lógica de checar se já há reserva.
      let quarto: Quarto = _quartos.filter((q) => {
        return q.categoria.nome === this.categoria.nome;
      })[0];
      reserva.quarto = quarto.id;
      let checkIn = moment(reserva.dataReserva);
      let checkOut = moment(reserva.dataSaida);

      if (checkIn.isBefore(moment()) || checkOut.isBefore(moment()) || checkOut.isBefore(checkIn))
        return this.toastrService.warning('Insira datas válidas!');

      reserva.tempoEstadia = checkOut.diff(checkIn, "days") + 1;
      reserva.dataReserva = moment(reserva.dataReserva).format(
        "DD/MM/yyyy HH:mm:ss"
      );
      reserva.dataSaida = moment(reserva.dataSaida).format(
        "DD/MM/yyyy HH:mm:ss"
      );
      //  = moment(reserva.dataSaida).format('DD/MM/yyyy').diff(moment(reserva.dataReserva).format('DD/MM/yyyy'), "days") + 1;
      this.rs.update(reserva).subscribe((res) => {
        this.getReservas();
        this.hideModal();
      });
    });
  }

  findCliente() {
    this.clis.findAll().subscribe((res: Cliente[]) => {
      (res) =>
        res.map((c: Cliente) => {
          c.cpf = c.cpf.replace(".", "").replace(".", "").replace("-", "");
          return c;
        });

      this.cliente = res.filter((c) => {
        return c.cpf ===
          this.cpf.replace(".", "").replace(".", "").replace("-", "")
          ? c
          : null;
      })[0];

      console.log(this.cliente, this.cpf);

      if (this.cliente === undefined)
        this.toastrService.warning(
          "Nenhum cliente encontrado para o cpf informado."
        );
    });
  }

  openForm(id) {
    this.rs.findById(id).subscribe(res => {
      this.reserva = res;
      this.cliente = this.reserva.cliente;
      this.cpf = this.cliente.cpf;
      this.changeCategoria(this.reserva.quarto.categoria.id);
      this.configurateForm(true);
    });
  }

  configurateForm(edit?) {

    if(edit) {
      let dataReserva = moment(this.reserva.dataReserva, 'DD/MM/yyyy HH:mm').format('DD/MM/yyyy HH:mm').toString()
      .split(' ');
      let dataSaida = moment(this.reserva.dataSaida, 'DD/MM/yyyy HH:mm').format('DD/MM/yyyy HH:mm').toString()
      .split(' ');

      this.reserva.dataReserva = dataReserva[0].split('/').reverse().join('-') + ' ' + dataReserva[1];
      this.reserva.dataSaida = dataSaida[0].split('/').reverse().join('-') + ' ' + dataSaida[1];
      
      this.valorTotal = this.reserva.valor;
      this.form = this.fb.group({
        id: [this.reserva.id],
        categoria: [this.reserva.quarto.categoria.id, [Validators.required]],
        // qtdHospedes: [
        //   1,
        //   [Validators.min(1), Validators.max(6), Validators.required],
        // ],
        dataReserva: [this.reserva.dataReserva, [Validators.required, Validators.minLength(15)]],
        dataSaida: [this.reserva.dataSaida, [Validators.required, Validators.minLength(15)]],
      });

      this.categoria = this.reserva.quarto.categoria;
      this.categoria.imageUrl = "https://pim-unip-resort.s3.sa-east-1.amazonaws.com/" + this.categoria.imageUrl;

      return this.revealModal();
    }

    this.form = this.fb.group({
      categoria: [, [Validators.required]],
      // qtdHospedes: [
      //   1,
      //   [Validators.min(1), Validators.max(6), Validators.required],
      // ],
      dataReserva: [null, [Validators.required, Validators.minLength(15)]],
      dataSaida: [null, [Validators.required, Validators.minLength(15)]],
    });
  }

  reservaRealizada() {
    this.router.navigate(["reservas/nova-reserva/reserva-realizada"], {
      relativeTo: this.route.root,
    });
  }

  calcularValorDiaria() {
    if (
      this.form.get("dataReserva").value &&
      this.form.get("dataSaida").value
    ) {
      let checkIn = moment(this.form.get("dataReserva").value);
      let checkOut = moment(this.form.get("dataSaida").value);
      let days = checkOut.diff(checkIn, "days") + 1;

      if (!checkOut.isSameOrAfter(checkIn)) {
        return this.toastrService.warning('Insira datas válidas!');
      }

      // if (this.form.get("qtdHospedes").value) {
      //   let qtdHospedes = this.form.get("qtdHospedes").value;

      //   if (qtdHospedes > 0) {
      //     this.valorTaxa = (Number(this.categoria.precoDiaria) / 10) * qtdHospedes;
      //   }
      // }

      this.valorTotal = Number(this.categoria.precoDiaria) * days;
    }
  }

  changeCategoria(categoriaId?: Number) {
    let categoria;

    if (categoriaId) {
      categoria =
        this.categorias[this.categorias.findIndex((c) => c.id == categoriaId)];
      this.categoria = categoria;
    } else if (!this.form.get("categoria").value) {
      this.categoria = this.categorias[0];
      this.form.get("categoria").setValue(this.categoria.nome);
    } else {
      categoria =
        this.categorias[
          this.categorias.findIndex(
            (c) => c.nome == this.form.get("categoria").value
          )
        ];
      this.categoria = categoria;
    }

    this.form.get("categoria").setValue(categoria.id);
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
