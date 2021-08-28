import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      nome: new FormControl({ name: "nome" }, { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

}
