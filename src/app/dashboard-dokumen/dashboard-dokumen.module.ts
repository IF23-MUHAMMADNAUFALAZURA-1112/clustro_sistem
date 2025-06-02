import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDokumenPageRoutingModule } from './dashboard-dokumen-routing.module';

import { DashboardDokumenPage } from './dashboard-dokumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDokumenPageRoutingModule
  ],
  declarations: [DashboardDokumenPage]
})
export class DashboardDokumenPageModule {}
