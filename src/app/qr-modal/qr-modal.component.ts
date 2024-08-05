import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent implements OnInit {
  @Input() qrData!: string;
  @Input() selectedKid: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Datos del niño seleccionado:', this.selectedKid);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
