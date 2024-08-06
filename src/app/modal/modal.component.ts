import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
}
