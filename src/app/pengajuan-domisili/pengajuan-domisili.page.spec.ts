import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanDomisiliPage } from './pengajuan-domisili.page';

describe('PengajuanDomisiliPage', () => {
  let component: PengajuanDomisiliPage;
  let fixture: ComponentFixture<PengajuanDomisiliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanDomisiliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
