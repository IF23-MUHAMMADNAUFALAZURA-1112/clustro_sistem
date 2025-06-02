import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuratPengantarKematianPageRoutingModule } from './surat-pengantar-kematian-routing.module';

import { SuratPengantarKematianPage } from './surat-pengantar-kematian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuratPengantarKematianPageRoutingModule
  ],
  declarations: [SuratPengantarKematianPage]
})
export class SuratPengantarKematianPageModule {}
