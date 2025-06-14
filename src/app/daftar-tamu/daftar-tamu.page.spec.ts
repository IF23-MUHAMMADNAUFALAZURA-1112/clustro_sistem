import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaftarTamuPage } from './daftar-tamu.page';

describe('DaftarTamuPage', () => {
  let component: DaftarTamuPage;
  let fixture: ComponentFixture<DaftarTamuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarTamuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
