import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return this.form = this.fb.group({
      email: [null, {validators: [
        Validators.email
      ]}],
      senha: [null, {validators: [
        Validators.required
      ]}],
    })
  }

  onSubmit(){
    if(this.form.valid) {
      let login: Login = Object.assign({}, this.form.value);
      this.authService.authenticate(login).subscribe();
    }
  }

}
