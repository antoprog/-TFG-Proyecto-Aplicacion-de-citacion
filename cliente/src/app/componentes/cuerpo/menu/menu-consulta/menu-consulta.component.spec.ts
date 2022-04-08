import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConsultaComponent } from './menu-consulta.component';

describe('MenuConsultaComponent', () => {
  let component: MenuConsultaComponent;
  let fixture: ComponentFixture<MenuConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
