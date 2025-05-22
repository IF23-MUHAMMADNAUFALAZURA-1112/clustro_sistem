import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BtnNavigationbarComponent } from './btn-navigationbar/btn-navigationbar.component';

@NgModule({
  declarations: [
    BtnNavigationbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BtnNavigationbarComponent
  ]
})
export class SharedModule {}
