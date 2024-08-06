import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterkidsPageRoutingModule } from './registerkids-routing.module';

import { RegisterkidsPage } from './registerkids.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterkidsPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [RegisterkidsPage]
})
export class RegisterkidsPageModule {}
