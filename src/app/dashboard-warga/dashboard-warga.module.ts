import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BtnNavigationbarComponent } from '../btn-navigationbar/btn-navigationbar.component';  // Impor komponen
import { DashboardWargaPage } from './dashboard-warga.page';

@NgModule({
  declarations: [DashboardWargaPage,
  BtnNavigationbarComponent,
  ],
  
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
