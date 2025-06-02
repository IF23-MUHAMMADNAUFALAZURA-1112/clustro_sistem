import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengajuanDokumenPageRoutingModule } from './pengajuan-dokumen-routing.module';

import { PengajuanDokumenPage } from './pengajuan-dokumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengajuanDokumenPageRoutingModule
  ],
  declarations: [PengajuanDokumenPage]
})
export class PengajuanDokumenPageModule {}
