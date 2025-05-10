import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginClustroPage } from './login-clustro.page';

describe('LoginClustroPage', () => {
  let component: LoginClustroPage;
  let fixture: ComponentFixture<LoginClustroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClustroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
