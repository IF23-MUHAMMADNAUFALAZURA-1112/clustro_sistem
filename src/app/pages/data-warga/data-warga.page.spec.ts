import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataWargaPage } from './data-warga.page';

describe('DataWargaPage', () => {
  let component: DataWargaPage;
  let fixture: ComponentFixture<DataWargaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
