import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengajuanDomisiliPage } from './pengajuan-domisili.page';

const routes: Routes = [
  {
    path: '',
    component: PengajuanDomisiliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengajuanDomisiliPageRoutingModule {}
