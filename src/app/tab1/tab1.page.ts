import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from '../qr-modal/qr-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  qrData: string = 'Omar Gonzalez Ruiz';

  constructor(private modalController: ModalController) {}

    async openQrModal() {
      const modal = await this.modalController.create({
        component: QrModalComponent,
        componentProps: { qrData: this.qrData }
      });
      return await modal.present();
    }

}
