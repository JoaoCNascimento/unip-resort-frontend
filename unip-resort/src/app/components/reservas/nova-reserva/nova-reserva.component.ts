import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nova-reserva',
  templateUrl: './nova-reserva.component.html',
  styleUrls: ['./nova-reserva.component.css']
})
export class NovaReservaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm() {
    this.form = this.fb.group({

    });
  }

}
