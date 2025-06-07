import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSatpamPage } from './profile-satpam.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSatpamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSatpamPageRoutingModule {}
