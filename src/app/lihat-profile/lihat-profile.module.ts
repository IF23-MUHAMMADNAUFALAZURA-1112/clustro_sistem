import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LihatProfilePageRoutingModule } from './lihat-profile-routing.module';
import { LihatProfilePage } from './lihat-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LihatProfilePageRoutingModule
  ],
  declarations: [LihatProfilePage]
})
export class LihatProfilePageModule {}
