import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DashboardWargaPage } from './dashboard-warga.page';
import { SharedModule } from '../shared/shared.module';  // Import SharedModule yang berisi Component yang telah didaftarkan

@NgModule({
  declarations: [
    DashboardWargaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,   // Masukkan SharedModule di sini
    RouterModule.forChild([
      {
        path: '',
        component: DashboardWargaPage
      }
    ])
  ]
})
export class DashboardWargaPageModule {}
