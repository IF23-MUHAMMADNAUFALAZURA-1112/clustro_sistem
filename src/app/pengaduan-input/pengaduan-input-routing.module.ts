import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengaduanInputPage } from './pengaduan-input.page';

const routes: Routes = [
  {
    path: '',
    component: PengaduanInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengaduanInputPageRoutingModule {}
