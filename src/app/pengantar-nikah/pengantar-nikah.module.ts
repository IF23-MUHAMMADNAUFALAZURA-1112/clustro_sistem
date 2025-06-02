import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengantarNikahPageRoutingModule } from './pengantar-nikah-routing.module';

import { PengantarNikahPage } from './pengantar-nikah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengantarNikahPageRoutingModule
  ],
  declarations: [PengantarNikahPage]
})
export class PengantarNikahPageModule {}
