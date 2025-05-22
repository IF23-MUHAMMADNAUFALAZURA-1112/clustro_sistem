import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PengaduanClustroPageRoutingModule } from './pengaduan-clustro-routing.module';
import { PengaduanClustroPage } from './pengaduan-clustro.page';
import { SharedModule } from '../shared/shared.module';  // Import SharedModule yang berisi BtnNavigationbarComponent

// import { KeluhanComponent } from '../components/keluhan/keluhan.component';
// import { LaporanPenggunaComponent } from '../components/laporan/laporan-pengguna.component';
// import { AspirasiComponent } from '../components/aspirasi/aspirasi.component';

@NgModule({
  declarations: [
    PengaduanClustroPage,
    // KeluhanComponent,
    // LaporanPenggunaComponent,
    // AspirasiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,   
    PengaduanClustroPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PengaduanClustroPageModule {}
