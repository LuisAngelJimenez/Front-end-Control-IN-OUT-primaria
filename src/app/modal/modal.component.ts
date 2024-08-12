/* import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() qrData!: string;
  @Input() selectedKid: any;

  isScanning: boolean = false;  // Flag to prevent multiple scans

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  ngOnDestroy() {
    this.detenerEscanner();  // Ensure scanner stops when component is destroyed
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async abrirEscaner() {
    await this.abrirEscaner(); // Detener cualquier escaneo anterior
    await this.detenerEscanner(); // Iniciar un nuevo escaneo
}

  async openQrScan() {
      try {
        const isScanning = await BarcodeScanner.checkPermission({ force: false });
        if (!isScanning.granted || isScanning.denied) {
            const status = await BarcodeScanner.checkPermission({ force: true });
            if (!status.granted) {
                throw new Error("Permiso de la cámara no concedido");
            }
        }

        await BarcodeScanner.startScan(); // Inicia el escaneo solo si no está activo
    } catch (error) {
        console.error("Error al iniciar el escaneo:", error);
        // Maneja el error zaquí
    }
  }

  async detenerEscanner() {
    try {
      await BarcodeScanner.stopScan(); // Detiene el escaneo antes de iniciar uno nuevo
  } catch (error) {
      console.error("Error al detener el escaneo:", error);
      // Maneja el error aquí
  }}


}
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApisService } from '../services/apis.service';  // Importa tu servicio aquí
import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() qrData!: string;
  @Input() selectedKid: any;

  isScanning: boolean = false;  // Flag to prevent multiple scans

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private apisService: ApisService  // Inyecta tu servicio aquí
  ) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  ngOnDestroy() {
    this.detenerEscanner();  // Ensure scanner stops when component is destroyed
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async abrirEscaner() {
    await this.detenerEscanner(); // Detener cualquier escaneo anterior
    await this.openQrScan(); // Iniciar un nuevo escaneo
  }

  async openQrScan() {
    try {
      const permission = await BarcodeScanner.checkPermission({ force: true });
      if (!permission.granted) {
        throw new Error('Permiso de la cámara no concedido');
      }

      const result = await BarcodeScanner.startScan(); // Inicia el escaneo

      if (result.hasContent) {
        this.qrData = result.content;
        this.handleQrScan(result.content); // Maneja el resultado del escaneo
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
      this.showAlert('Error', 'No se pudo iniciar el escaneo.');
    }
  }

  async detenerEscanner() {
    try {
      await BarcodeScanner.stopScan(); // Detiene el escaneo antes de iniciar uno nuevo
    } catch (error) {
      console.error('Error al detener el escaneo:', error);
    }
  }


    async handleQrScan(qrContent: string) {
      try {
        const kids: any = await this.apisService.getKids().toPromise();
        const kid = kids.find((k: any) => k.id === qrContent);

        if (kid) {
          const lastScanTime = localStorage.getItem(`lastScanTime_${kid.id}`);
          const currentTime = moment();

          if (lastScanTime) {
            const timeDiff = currentTime.diff(moment(lastScanTime), 'days');

            if (timeDiff >= 1) {
              // Si ha pasado un día o más, reactivar el estado a true
              await this.updateKidStatus(kid.id, true);
            }
          }

          if (kid.is_active) {
            await this.updateKidStatus(kid.id, false);
            this.showAlert('Éxito', 'El niño ha sido recogido.');

            // Guardar la hora del escaneo en localStorage
            localStorage.setItem(`lastScanTime_${kid.id}`, currentTime.toISOString());
          } else {
            this.showAlert('Código QR vencido', 'El niño ya fue recogido.');
          }
        } else {
          this.showAlert('Error', 'Niño no encontrado.');
        }
      } catch (error) {
        console.error('Error al manejar el escaneo:', error);
        this.showAlert('Error', 'No se pudo verificar el código QR.');
      }
    }

  async updateKidStatus(kidId: string, isActive: boolean) {
    // Aquí llamas al servicio para actualizar el estado del niño
    try {
      // Aquí actualizarías el estado en tu base de datos, usando tu servicio
      await this.apisService.updateKidStatus(kidId, isActive).toPromise();
    } catch (error) {
      console.error('Error al actualizar el estado del niño:', error);
      this.showAlert('Error', 'No se pudo actualizar el estado del niño.');
    }
  }

  showAlert(header: string, message: string) {
    this.alertController.create({
      header,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
