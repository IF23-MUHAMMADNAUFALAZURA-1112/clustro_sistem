import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HalamanPengaduanPage } from './halaman-pengaduan.page';

describe('HalamanPengaduanPage', () => {
  let component: HalamanPengaduanPage;
  let fixture: ComponentFixture<HalamanPengaduanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanPengaduanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
