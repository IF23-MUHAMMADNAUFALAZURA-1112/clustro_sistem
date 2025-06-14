import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarTamuPageRoutingModule } from './daftar-tamu-routing.module';

import { DaftarTamuPage } from './daftar-tamu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarTamuPageRoutingModule
  ],
  declarations: [DaftarTamuPage]
})
export class DaftarTamuPageModule {}
