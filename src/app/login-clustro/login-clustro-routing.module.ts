import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClustroPage } from './login-clustro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClustroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClustroPageRoutingModule {}
