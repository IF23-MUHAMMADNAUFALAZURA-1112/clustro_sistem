import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWargaPage } from './dashboard-warga.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardWargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardWargaPageRoutingModule {}
