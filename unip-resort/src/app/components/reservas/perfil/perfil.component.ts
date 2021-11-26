import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  faEdit,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Cliente } from "src/app/models/Cliente";
import { ClienteService } from "src/app/services/api/cliente.service";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"],
})
export class PerfilComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;

  form: FormGroup;

  cliente: Cliente = null;

  constructor(
    public fb: FormBuilder
    ,private cs: ClienteService
    ) {}

  ngOnInit(): void {
    this.configurarForm();
    this.getCliente();
  }

  getCliente() {
    this.cs.findByEmail().subscribe(
      (res: Cliente) => {
        res.dataNasc = res.dataNasc.split('/').reverse().join('-');
        this.cliente = res;
      this.configurarForm();}
    );
  }

  configurarForm() {
    if(this.cliente !== null) {
      this.form = this.fb.group({
        nome: new FormControl(this.cliente.nome, {
          validators: [Validators.required],
        }),
        email: new FormControl(this.cliente.email, {
          validators: [Validators.required, Validators.email],
        }),
        senha: new FormControl('Digite sua senha, ou uma nova', {
          validators: [Validators.required],
        }),
        cpf: new FormControl(this.cliente.cpf, {
          validators: [Validators.required],
        }),
        rg: new FormControl(this.cliente.rg, {
          validators: [Validators.required],
        }),
        dataNasc: new FormControl(this.cliente.dataNasc, {
          validators: [Validators.required],
        }),
        telefone: new FormControl(this.cliente.telefone, {
          validators: [Validators.required],
        }),
        cep: new FormControl(this.cliente.bairro, {
          validators: [Validators.required],
        }),
        rua: new FormControl(this.cliente.rua, {
          validators: [Validators.required],
        }),
        bairro: new FormControl(this.cliente.bairro, {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.cliente.numero, {
          validators: [Validators.required],
        }),
        cidade: new FormControl(this.cliente.cidade, {
          validators: [Validators.required],
        }),
        estado: new FormControl(this.cliente.estado, {
          validators: [Validators.required],
        })
      });

      return this.form.disable();
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
      })
    });

    return this.form.disable();
  }

  ativarEdicao() {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
