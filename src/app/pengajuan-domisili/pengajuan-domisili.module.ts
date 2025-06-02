import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengajuanDomisiliPageRoutingModule } from './pengajuan-domisili-routing.module';

import { PengajuanDomisiliPage } from './pengajuan-domisili.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengajuanDomisiliPageRoutingModule
  ],
  declarations: [PengajuanDomisiliPage]
})
export class PengajuanDomisiliPageModule {}
