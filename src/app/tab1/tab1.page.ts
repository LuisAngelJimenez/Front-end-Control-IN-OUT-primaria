import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { AuthService } from '../services/auth.service';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  kids: any[] = [];
  currentUser: any;
  currentUserKids: any[] = [];
  selectedKidId: string = '';
  selectedKid: any = null;
  now = new Date();
  timeString = this.now.toLocaleTimeString();
  dateString = this.now.toLocaleDateString();


  constructor(private modalController: ModalController, private services: AuthService, private api: ApisService) { }

  ngOnInit() {
    this.currentUser = this.services.getCurrentUser();
    this.loadKids();
    console.log('Datos del usuario id:', this.currentUser.id);
  }

  async openQrModal() {
    const modal = await this.modalController.create({
      component: QrModalComponent,
      componentProps: {
        qrData: JSON.stringify(this.selectedKid.id),
        selectedKid: this.selectedKid
      }
    });
    return await modal.present();
  }

  loadKids() {
    this.api.getKids().subscribe(
      (data: any) => {
        this.kids = data;
        this.currentUserKids = [];
        for (let kid of data) {
          if (kid.tutor[0].id === this.currentUser.id) {
            this.currentUserKids.push(kid); // Agregar el niño al arreglo si el ID del tutor coincide
          }
        }
        if (this.currentUserKids.length > 0) {
          this.selectedKidId = this.currentUserKids[0].id;
          this.selectedKid = this.currentUserKids[0];
        }
        console.log(this.currentUserKids);
      },
      (error) => {
        console.error('Error al cargar los grupos', error);
      }
    );
  }

  onKidChange(event: any) {
    const selectedId = event.detail.value;
    this.selectedKid = this.currentUserKids.find(kid => kid.id === selectedId);
  }


}

