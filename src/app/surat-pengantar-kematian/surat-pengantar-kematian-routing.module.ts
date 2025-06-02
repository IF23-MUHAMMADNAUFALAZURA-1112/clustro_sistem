import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratPengantarKematianPage } from './surat-pengantar-kematian.page';

const routes: Routes = [
  {
    path: '',
    component: SuratPengantarKematianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratPengantarKematianPageRoutingModule {}
