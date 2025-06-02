import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalamanPengaduanPage } from './halaman-pengaduan.page';

const routes: Routes = [
  {
    path: '',
    component: HalamanPengaduanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HalamanPengaduanPage]
})
export class HalamanPengaduanPageModule {}
