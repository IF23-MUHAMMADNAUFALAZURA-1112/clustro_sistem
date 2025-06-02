import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuratPengantarKematianPage } from './surat-pengantar-kematian.page';

describe('SuratPengantarKematianPage', () => {
  let component: SuratPengantarKematianPage;
  let fixture: ComponentFixture<SuratPengantarKematianPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuratPengantarKematianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
