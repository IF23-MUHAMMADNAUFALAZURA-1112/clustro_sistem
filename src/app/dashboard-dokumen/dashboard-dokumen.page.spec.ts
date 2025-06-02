import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDokumenPage } from './dashboard-dokumen.page';

describe('DashboardDokumenPage', () => {
  let component: DashboardDokumenPage;
  let fixture: ComponentFixture<DashboardDokumenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDokumenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
