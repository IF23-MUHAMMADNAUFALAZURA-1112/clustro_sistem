import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengaduanDetailPage } from './pengaduan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PengaduanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengaduanDetailPageRoutingModule {}
