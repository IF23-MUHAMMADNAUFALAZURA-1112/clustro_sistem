import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryTamuPageRoutingModule } from './history-tamu-routing.module';

import { HistoryTamuPage } from './history-tamu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryTamuPageRoutingModule
  ],
  declarations: [HistoryTamuPage]
})
export class HistoryTamuPageModule {}
