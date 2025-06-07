import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BukuTamuComponent } from './buku-tamu.component';

describe('BukuTamuComponent', () => {
  let component: BukuTamuComponent;
  let fixture: ComponentFixture<BukuTamuComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BukuTamuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
