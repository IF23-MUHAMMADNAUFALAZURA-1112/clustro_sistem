import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSatpamPage } from './dashboard-satpam.page';

describe('DashboardSatpamPage', () => {
  let component: DashboardSatpamPage;
  let fixture: ComponentFixture<DashboardSatpamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSatpamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
