import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengaduanListPage } from './pengaduan-list.page';

describe('PengaduanListPage', () => {
  let component: PengaduanListPage;
  let fixture: ComponentFixture<PengaduanListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaduanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
