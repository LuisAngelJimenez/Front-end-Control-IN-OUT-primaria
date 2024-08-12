/* import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {

  scannedData: any;

  constructor(private modalController: ModalController, private qrScanner: QRScanner) {}

  ngOnInit() {
    this.startScan();
  }

  startScan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.scannedData = JSON.parse(text); // Decodifica los datos del niño
          this.qrScanner.hide(); // Esconde el visor de la cámara
          scanSub.unsubscribe(); // Detén el escaneo
        });

        this.qrScanner.show();
      } else if (status.denied) {
        // La cámara no está permitida, solicita permiso
      } else {
        // La cámara no está disponible
      }
    }).catch((error: any) => console.log('Error', error));
  }

  closeModal() {
    this.modalController.dismiss();
  }

}

 */


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  ngOnInit() {
    //this.startScan();
  }
/*
  scannedData: any;

  constructor(private modalController: ModalController, private qrScanner: QRScanner) {}


  startScan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.scannedData = JSON.parse(text); // Decodifica los datos del niño
          this.qrScanner.hide(); // Esconde el visor de la cámara
          scanSub.unsubscribe(); // Detén el escaneo
        });

        this.qrScanner.show();
      } else if (status.denied) {
        // La cámara no está permitida, solicita permiso
        console.log('Permiso para la cámara denegado');
      } else {
        // La cámara no está disponible
        console.log('La cámara no está disponible');
      }
    }).catch((error: any) => console.log('Error al preparar el escáner', error));
  }

  closeModal() {
    this.modalController.dismiss();
  } */
}


//CODIGO DEL CODIGO SCANNER DE ERICK

/* async leerQR() {
    const resultPermisos = await BarcodeScanner.checkPermission({
      force: true,
    });

    if (resultPermisos.denied) {
      const alert = await this.alertController.create({
        header: 'Permisos',
        message:
          'La aplicación necesita permisos para acceder a la cámara, ¿Desea ir a configuración?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Ir a configuración',
            handler: () => {
              BarcodeScanner.openAppSettings();
            },
          },
        ],
      });

      await alert.present();

      return;
    }

    BarcodeScanner.prepare();
    App.addListener('backButton', () => {
      this.detenerEscanner();
    });

    BarcodeScanner.hideBackground();

    document.body.classList.add('qrscanner');
    document.querySelector('body')?.classList?.add('scanner-active');

    const fechformat = moment().format();
    const fecha = moment(fechformat, 'YYYY-MM-DD');
    const horaActual = moment();

    const result = await BarcodeScanner.startScan({
      targetedFormats: [SupportedFormat.QR_CODE],
    }); // start scanning and wait for a result

    this.detenerEscanner();

    // if the result has content
    if (result.hasContent) {
      const datqr = JSON.parse(result.content);
      const horaQRPOST = moment(datqr.hora, 'HH:mm').add(5, 'hours').toDate();
      const dateQR = moment(datqr.fecha, 'YYYY-MM-DD');

      // Verificar si hora1 es anterior a hora2
      const esIgualFecha = fecha.isSame(dateQR);
      const esHoraAnterior = horaActual.isBefore(horaQRPOST);
      if (!esIgualFecha || !esHoraAnterior) {
        this.alerts.generateToastErrorQR('El QR ha expirado!');
        return;
      }
      this.info = datqr;
      this.getAutorizado();
    }
  } */


    /* async detenerEscanner() {
    await BarcodeScanner.stopScan();
    await BarcodeScanner.showBackground();
    document.body.classList.remove('qrscanner');
    document.querySelector('body')?.classList?.remove('scanner-active');

    await App.removeAllListeners();
  } */


    /* .scanner-ui { display: none; }
.scanner-hide { visibility: visible; }

body.qrscanner { background-color: transparent; }
body.qrscanner .scanner-ui { display: block; }
body.qrscanner .scanner-hide { visibility: hidden; } */
