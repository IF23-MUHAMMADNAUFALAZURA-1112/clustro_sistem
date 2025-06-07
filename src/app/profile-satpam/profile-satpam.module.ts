import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSatpamPageRoutingModule } from './profile-satpam-routing.module';

import { ProfileSatpamPage } from './profile-satpam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSatpamPageRoutingModule
  ],
  declarations: [ProfileSatpamPage]
})
export class ProfileSatpamPageModule {}
