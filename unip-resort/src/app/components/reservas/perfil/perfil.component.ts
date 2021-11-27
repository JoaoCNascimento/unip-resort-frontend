import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  faEdit,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/Cliente";
import { ClienteService } from "src/app/services/api/cliente.service";
import { CepService } from "src/app/services/cep.service";

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

  editavel = false;

  form: FormGroup;

  cliente: Cliente = null;

  constructor(
    public fb: FormBuilder
    ,private cs: ClienteService
    ,private toastrService: ToastrService
    ,private router: Router
    ,private cepService: CepService
    ,private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.configurarForm();
    this.getCliente();
  }

  deleteConta() {
    if(confirm('Deseja realmente excluir sua conta?')){
      this.cs.delete(this.cliente.id).subscribe(res => {
        this.router.navigate(['/'],{relativeTo: this.route.root})
        this.toastrService.info('Até a próxima!', '', { timeOut: 15000 })
      })
      return;
    }
    this.toastrService.info('Exclusão cancelada.');
  }

  onSubmitUpdate() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se todos os campos foram preenchidos corretamente.', 'Formulário inválido...', {
        timeOut: 4000
      });
    }

    if(this.form.get('senha').value === 'Digite sua senha, ou uma nova'){
      this.toastrService.warning('Para salvar as alterações, digite sua senha ou uma nova.', '', {timeOut: 10000});
      return this.toastrService.info('Para atualizar quaisquer campos é necessário atualizar, ou reinserir, a sua senha.', '', {timeOut: 10000});
    }

    let cliente: Cliente = Object.assign({}, this.form.value)

    cliente.dataNasc = moment(cliente.dataNasc.toString()).format('DD/MM/yyyy');

    this.cs.update(cliente).subscribe(res => {
      this.getCliente();
      this.ativarEdicao();
    });
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
        id: new FormControl(this.cliente.id),
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
        cep: new FormControl(this.cliente.cep, {
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
      this.editavel = false;
      this.toastrService.info('Formulário bloqueado para edição.');
    } else {
      this.form.enable();
      this.editavel = true;
      this.toastrService.info('Formulário editável.');
    }
  }

  findCep() {
    this.cepService.get(this.form.get('cep').value).subscribe(res => this.changeAdressValues(res));
  }

  changeAdressValues(obj) {

    console.log(obj);

    if (obj.erro) {
      return alert("Cep não encontrado");
    }

    this.form.get('rua').setValue(obj.logradouro);
    this.form.get('bairro').setValue(obj.bairro);
    this.form.get('cidade').setValue(obj.localidade);
    this.form.get('estado').setValue(obj.uf);
  }
}
