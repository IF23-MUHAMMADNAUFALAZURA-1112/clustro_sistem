import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryTamuPage } from './history-tamu.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryTamuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryTamuPageRoutingModule {}
