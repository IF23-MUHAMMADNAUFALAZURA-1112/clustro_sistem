import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardSatpamPageRoutingModule } from './dashboard-satpam-routing.module';

import { DashboardSatpamPage } from './dashboard-satpam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardSatpamPageRoutingModule
  ],
  declarations: [DashboardSatpamPage]
})
export class DashboardSatpamPageModule {}
