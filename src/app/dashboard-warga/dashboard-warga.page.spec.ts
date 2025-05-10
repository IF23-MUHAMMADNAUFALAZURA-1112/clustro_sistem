import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardWargaPage } from './dashboard-warga.page';

describe('DashboardWargaPage', () => {
  let component: DashboardWargaPage;
  let fixture: ComponentFixture<DashboardWargaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
