import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';

import { IonicStorageModule } from '@ionic/storage-angular';
import { QrModalComponent } from './qr-modal/qr-modal.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [AppComponent,LoginPage,QrModalComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      IonicStorageModule.forRoot(),
      QRCodeModule,
      ReactiveFormsModule
    ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
