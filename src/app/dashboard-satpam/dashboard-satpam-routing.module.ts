import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSatpamPage } from './dashboard-satpam.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSatpamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSatpamPageRoutingModule {}
