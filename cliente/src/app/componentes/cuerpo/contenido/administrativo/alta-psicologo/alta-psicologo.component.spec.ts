import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPsicologoComponent } from './alta-psicologo.component';

describe('AltaPsicologoComponent', () => {
  let component: AltaPsicologoComponent;
  let fixture: ComponentFixture<AltaPsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPsicologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
