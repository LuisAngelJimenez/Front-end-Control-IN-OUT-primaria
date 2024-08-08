/* import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() qrData!: string;
  @Input() selectedKid: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openQrScan() {
    const modal = await this.modalController.create({
      component: ScannerComponent
    });
    return await modal.present();
  }
}
 */

/*
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() qrData!: string;
  @Input() selectedKid: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openQrScan() {
    const modal = await this.modalController.create({
      component: ScannerComponent,
      componentProps: {
        // Puedes pasar datos al ScannerComponent si es necesario
      }
    });
    return await modal.present();
  }
}
 */

import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() qrData!: string;
  @Input() selectedKid: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openQrScan() {
    const resultPermisos = await BarcodeScanner.checkPermission({ force: true });

    if (resultPermisos.denied) {
      const alert = await this.alertController.create({
        header: 'Permisos',
        message: 'La aplicación necesita permisos para acceder a la cámara, ¿Desea ir a configuración?',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Ir a configuración', handler: () => { BarcodeScanner.openAppSettings(); } }
        ],
      });

      await alert.present();
      return;
    }

    BarcodeScanner.prepare();
    BarcodeScanner.hideBackground();
    document.body.classList.add('qrscanner');

    //const result = await BarcodeScanner.startScan({ targetedFormats: [BarcodeScanner.SupportedFormat.QR_CODE] });
    const result = await BarcodeScanner.startScan({
      targetedFormats: ['QR_CODE'], // Usar el formato como una cadena
    });

    this.detenerEscanner();

    if (result.hasContent) {
      const datqr = JSON.parse(result.content);
      const horaQRPOST = moment(datqr.hora, 'HH:mm').add(5, 'hours').toDate();
      const fechaActual = moment();
      const dateQR = moment(datqr.fecha, 'YYYY-MM-DD');

      const esIgualFecha = fechaActual.isSame(dateQR);
      const esHoraAnterior = moment().isBefore(horaQRPOST);

      if (!esIgualFecha || !esHoraAnterior) {
        const toast = await this.alertController.create({
          header: 'Error',
          message: 'El QR ha expirado!',
          buttons: ['OK']
        });
        await toast.present();
        return;
      }

      this.qrData = datqr;
      console.log('Datos QR:', this.qrData);
      // Aquí puedes manejar los datos escaneados, por ejemplo, guardarlos o procesarlos.
    }
  }

  async detenerEscanner() {
    await BarcodeScanner.stopScan();
    await BarcodeScanner.showBackground();
    document.body.classList.remove('qrscanner');
  }

  


}
