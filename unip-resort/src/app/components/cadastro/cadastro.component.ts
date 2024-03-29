import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { AuthService } from 'src/app/services/api/auth.service';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cs: ClienteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cepService: CepService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if(this.authService.token)
      this.router.navigate(['/reservas'], {relativeTo: this.route.root})

    this.configurarForm();
  }

  configurarForm() {
    this.form = this.fb.group({
      nome: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      senha: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      cpf: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      rg: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      dataNasc: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      telefone: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      cep: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      rua: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      bairro: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      numero: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      cidade: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      estado: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      }),
      agreement: new FormControl(false, {
        validators: Validators.requiredTrue
      })
    })
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se todos os campos foram preenchidos corretamente.', 'Formulário inválido...', {
        timeOut: 4000
      });
    }

      let cliente: Cliente = Object.assign({}, this.form.value)

      this.cs.createCliente(cliente).subscribe(res => {
        this.router.navigate(['login']);
      });
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
