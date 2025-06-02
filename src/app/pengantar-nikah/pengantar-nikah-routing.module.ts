import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengantarNikahPage } from './pengantar-nikah.page';

const routes: Routes = [
  {
    path: '',
    component: PengantarNikahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengantarNikahPageRoutingModule {}
