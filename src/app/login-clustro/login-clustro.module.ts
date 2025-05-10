import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClustroPageRoutingModule } from './login-clustro-routing.module';

import { LoginClustroPage } from './login-clustro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginClustroPageRoutingModule
  ],
  declarations: [LoginClustroPage]
})
export class LoginClustroPageModule {}
