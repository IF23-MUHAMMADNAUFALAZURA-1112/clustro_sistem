import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengaduanDetailPage } from './pengaduan-detail.page';

describe('PengaduanDetailPage', () => {
  let component: PengaduanDetailPage;
  let fixture: ComponentFixture<PengaduanDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaduanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
