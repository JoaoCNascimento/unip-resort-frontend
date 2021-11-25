import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-administrar-clientes',
  templateUrl: './administrar-clientes.component.html',
  styleUrls: ['./administrar-clientes.component.css']
})
export class AdministrarClientesComponent implements OnInit {

  form: FormGroup;

  faEdit = faEdit;
  faTrash = faTrash;

  cliente: Cliente = undefined;
  clientes: Cliente[] = [];

  constructor(
    private cs:ClienteService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.cs.findAll().subscribe(
      (res:Cliente[])=> {this.clientes = res}
    )
  }

  configurateForm(id) {

    if(id) {
      this.form = this.fb.group({
        nome: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        email: new FormControl(this.cliente, {
          validators: [Validators.required, Validators.email],
        }),
        senha: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        cpf: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        rg: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        dataNasc: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        telefone: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        cep: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        rua: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        bairro: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        cidade: new FormControl(this.cliente, {
          validators: [Validators.required],
        }),
        estado: new FormControl(this.cliente, {
          validators: [Validators.required],
        })
      });

      return;
    }

    this.form = this.fb.group({
      nome: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      senha: new FormControl(null, {
        validators: [Validators.required],
      }),
      cpf: new FormControl(null, {
        validators: [Validators.required],
      }),
      rg: new FormControl(null, {
        validators: [Validators.required],
      }),
      dataNasc: new FormControl(null, {
        validators: [Validators.required],
      }),
      telefone: new FormControl(null, {
        validators: [Validators.required],
      }),
      cep: new FormControl(null, {
        validators: [Validators.required],
      }),
      rua: new FormControl(null, {
        validators: [Validators.required],
      }),
      bairro: new FormControl(null, {
        validators: [Validators.required],
      }),
      numero: new FormControl(null, {
        validators: [Validators.required],
      }),
      cidade: new FormControl(null, {
        validators: [Validators.required],
      }),
      estado: new FormControl(null, {
        validators: [Validators.required],
      }),
      agreement: new FormControl(false, {
        validators: Validators.requiredTrue,
      }),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning(
        "Verifique se todos os campos foram preenchidos corretamente.",
        "Formulário inválido...",
        {
          timeOut: 4000,
        }
      );
    }

    let cliente: Cliente = Object.assign({}, this.form.value);

    // this.cs.createCliente(cliente).subscribe((res) => {
    //   this.router.navigate(['funcionario/nova-reserva'], { relativeTo: this.route.root });
    // });
  }

  findCep() {
    this.cepService
      .get(this.form.get("cep").value)
      .subscribe((res) => this.changeAdressValues(res));
  }

  changeAdressValues(obj) {
    if (obj.erro) {
      this.toastrService.warning("Cep não encontrado.");
    }

    this.form.get("rua").setValue(obj.logradouro);
    this.form.get("bairro").setValue(obj.bairro);
    this.form.get("cidade").setValue(obj.localidade);
    this.form.get("estado").setValue(obj.uf);
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
