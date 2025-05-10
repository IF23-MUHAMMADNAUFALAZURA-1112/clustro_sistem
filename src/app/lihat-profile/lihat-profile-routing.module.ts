import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LihatProfilePage } from './lihat-profile.page';

const routes: Routes = [
  {
    path: '',
    component: LihatProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LihatProfilePageRoutingModule {}
