import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminprofilePageRoutingModule } from './adminprofile-routing.module';

import { AdminprofilePage } from './adminprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminprofilePageRoutingModule
  ],
  declarations: [AdminprofilePage]
})
export class AdminprofilePageModule {}
