import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/api/auth.service';
import { ClienteService } from 'src/app/services/api/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private cs: ClienteService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return this.form = this.fb.group({
      email: [null, {validators: [
        Validators.email,
        Validators.required
      ]}],
      senha: [null, {validators: [
        Validators.required
      ]}],
    })
  }

  resetPassword() {
    if(this.form.get('email').invalid)
    {
      this.toastrService.error('Digite um email para prosseguir com a solicitação.');
      return this.form.get('email').markAsTouched();
    }

      this.cs.forgotPassword(this.form.get('email').value).subscribe();
  }

  onSubmit(){
    if(this.form.valid) {
      let login: Login = Object.assign({}, this.form.value);
      this.authService.authenticate(login).subscribe();
    }
  }

}
