import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataWargaPageRoutingModule } from './data-warga-routing.module';

import { DataWargaPage } from './data-warga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataWargaPageRoutingModule
  ],
  declarations: [DataWargaPage]
})
export class DataWargaPageModule {}
