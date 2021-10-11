import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaRealizadaComponent } from './reserva-realizada.component';

describe('ReservaRealizadaComponent', () => {
  let component: ReservaRealizadaComponent;
  let fixture: ComponentFixture<ReservaRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
