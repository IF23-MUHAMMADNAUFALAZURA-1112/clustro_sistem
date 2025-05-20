import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengaduanInputPageRoutingModule } from './pengaduan-input-routing.module';

import { PengaduanInputPage } from './pengaduan-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengaduanInputPageRoutingModule
  ],
  declarations: [PengaduanInputPage]
})
export class PengaduanInputPageModule {}
