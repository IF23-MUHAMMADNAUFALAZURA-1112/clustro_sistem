import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengaduanClustroPage } from './pengaduan-clustro.page';

const routes: Routes = [
  {
    path: '',
    component: PengaduanClustroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengaduanClustroPageRoutingModule {}
