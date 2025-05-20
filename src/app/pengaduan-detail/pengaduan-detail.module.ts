import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PengaduanDetailPage } from './pengaduan-detail.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PengaduanDetailPage }])
  ],
  declarations: [PengaduanDetailPage]
})
export class PengaduanDetailPageModule {}
