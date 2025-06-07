import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataWargaPage } from './data-warga.page';

const routes: Routes = [
  {
    path: '',
    component: DataWargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataWargaPageRoutingModule {}
