import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BukuTamuComponent } from './buku-tamu.component';

const routes: Routes = [
  {
    path: '',
    component: BukuTamuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BukuTamuPageRoutingModule {}
