import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalamanPengaduanPage } from './halaman-pengaduan.page';

const routes: Routes = [
  {
    path: '',
    component: HalamanPengaduanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalamanPengaduanPageRoutingModule {}
