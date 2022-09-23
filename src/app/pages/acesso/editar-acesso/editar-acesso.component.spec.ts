import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAcessoComponent } from './editar-acesso.component';

describe('EditarAcessoComponent', () => {
  let component: EditarAcessoComponent;
  let fixture: ComponentFixture<EditarAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAcessoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
