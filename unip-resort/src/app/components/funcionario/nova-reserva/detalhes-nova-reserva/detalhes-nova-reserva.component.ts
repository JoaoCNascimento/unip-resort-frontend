import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalhes-nova-reserva',
  templateUrl: './detalhes-nova-reserva.component.html',
  styleUrls: ['./detalhes-nova-reserva.component.css']
})
export class DetalhesNovaReservaComponent implements OnInit {

  faSearch = faSearch;

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
