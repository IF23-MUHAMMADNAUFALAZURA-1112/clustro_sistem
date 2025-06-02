import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengantarNikahPage } from './pengantar-nikah.page';

describe('PengantarNikahPage', () => {
  let component: PengantarNikahPage;
  let fixture: ComponentFixture<PengantarNikahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengantarNikahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
