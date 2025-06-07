import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BukuTamuModule } from '../pages/buku-tamu/buku-tamu.module';
import { MonitoringTamuComponent } from '../pages/monitoring-tamu/monitoring-tamu.component';

import { RekapAktivitasComponent } from '../pages/rekap-aktivitas/rekap-aktivitas.component';

import { DashboardSatpamPageRoutingModule } from './dashboard-satpam-routing.module';
import { BukuTamuComponent } from '../pages/buku-tamu/buku-tamu.component';
import { DashboardSatpamPage } from './dashboard-satpam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BukuTamuModule,
    DashboardSatpamPageRoutingModule
  ],
  declarations: [
    DashboardSatpamPage,
    MonitoringTamuComponent,
    RekapAktivitasComponent
  
  ]
})
export class DashboardSatpamPageModule {}
