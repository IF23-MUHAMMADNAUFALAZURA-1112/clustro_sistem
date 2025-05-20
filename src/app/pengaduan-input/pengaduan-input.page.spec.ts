import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengaduanInputPage } from './pengaduan-input.page';

describe('PengaduanInputPage', () => {
  let component: PengaduanInputPage;
  let fixture: ComponentFixture<PengaduanInputPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaduanInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
