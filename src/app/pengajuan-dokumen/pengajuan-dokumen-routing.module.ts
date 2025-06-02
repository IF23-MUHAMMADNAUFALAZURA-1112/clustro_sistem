import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengajuanDokumenPage } from './pengajuan-dokumen.page';

const routes: Routes = [
  {
    path: '',
    component: PengajuanDokumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengajuanDokumenPageRoutingModule {}
