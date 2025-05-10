import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LihatProfilePage } from './lihat-profile.page';

describe('LihatProfilePage', () => {
  let component: LihatProfilePage;
  let fixture: ComponentFixture<LihatProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LihatProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
