import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhes-nova-reserva',
  templateUrl: './detalhes-nova-reserva.component.html',
  styleUrls: ['./detalhes-nova-reserva.component.css']
})
export class DetalhesNovaReservaComponent implements OnInit {

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
