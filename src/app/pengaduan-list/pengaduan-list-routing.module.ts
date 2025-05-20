import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengaduanListPage } from './pengaduan-list.page';

const routes: Routes = [
  {
    path: '',
    component: PengaduanListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengaduanListPageRoutingModule {}
