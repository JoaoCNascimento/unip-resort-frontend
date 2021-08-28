import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  faTrash = faTrash
  faEdit = faEdit
  faSave = faSave
  faTimes = faTimes

  form: FormGroup;

  usuario = {
    nome: "João Carlos",
    cpf: "040.419.126-44",
    rg: "10.412.414-5",
    sexo: "M",
    nascimento: "2002-03-24",
    email: "joao@email.com",
  }

  constructor(
    public fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm() {
    this.form = this.fb.group({
      nome: new FormControl({ value: this.usuario.nome, disabled: true },
        [Validators.required]),
      cpf: new FormControl({ value: this.usuario.cpf, disabled: true },
        [Validators.required]),
      rg: new FormControl({ value: this.usuario.rg, disabled: true },
        [Validators.required]),
      sexo: new FormControl({ value: this.usuario.sexo, disabled: true },
        [Validators.required]),
      nascimento: new FormControl({ value: this.usuario.nascimento, disabled: true },
        [Validators.required]),
      email: new FormControl({ value: this.usuario.email, disabled: true },
        [Validators.required, Validators.email])
    });

  }

  ativarEdicao() {
    if (this.form.enabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }
}
