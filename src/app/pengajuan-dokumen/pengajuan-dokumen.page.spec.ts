import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanDokumenPage } from './pengajuan-dokumen.page';

describe('PengajuanDokumenPage', () => {
  let component: PengajuanDokumenPage;
  let fixture: ComponentFixture<PengajuanDokumenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanDokumenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
