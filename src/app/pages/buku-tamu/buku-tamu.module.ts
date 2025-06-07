import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BukuTamuComponent } from './buku-tamu.component';

@NgModule({
  declarations: [BukuTamuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [BukuTamuComponent] // supaya bisa dipakai di luar
})
export class BukuTamuModule {}
