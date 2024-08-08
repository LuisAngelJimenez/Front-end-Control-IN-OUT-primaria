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
import { provideHttpClient } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { QRScanner } from '@ionic-native/qr-scanner';
import { ScannerComponent } from './scanner/scanner.component';

//importaciones para utilizar ngx-translate//
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//importaciones para el interceptor//
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent,LoginPage,QrModalComponent,ModalComponent,ScannerComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      IonicStorageModule.forRoot(),
      QRCodeModule,
      ReactiveFormsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideHttpClient(),/* QRScanner */
  {provide: HTTP_INTERCEPTORS,useClass:LoggingInterceptor,multi:true,}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})



export class AppModule {
  constructor(translate: TranslateService){

    const savedLang =  localStorage.getItem('selectedLanguage') || 'es';
    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

  }
}

