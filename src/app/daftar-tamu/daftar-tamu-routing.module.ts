import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarTamuPage } from './daftar-tamu.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarTamuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarTamuPageRoutingModule {}
