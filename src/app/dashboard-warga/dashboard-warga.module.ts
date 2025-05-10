import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DashboardWargaPage } from './dashboard-warga.page';

@NgModule({
  declarations: [DashboardWargaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardWargaPage
      }
    ])
  ]
})
export class DashboardWargaPageModule {}
