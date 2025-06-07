import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSatpamPage } from './profile-satpam.page';

describe('ProfileSatpamPage', () => {
  let component: ProfileSatpamPage;
  let fixture: ComponentFixture<ProfileSatpamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSatpamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
