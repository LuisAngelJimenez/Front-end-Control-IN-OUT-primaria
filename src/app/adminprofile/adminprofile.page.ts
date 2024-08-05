/* import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.page.html',
  styleUrls: ['./adminprofile.page.scss'],
})
export class AdminprofilePage implements OnInit {

  ngOnInit() {
    this.caragarGrupo();
    this.caragarKids();
  }

  qrData: string = 'Omar Gonzalez Ruiz';
  grupos:any [] = [];
  kids:any[]=[];

  constructor(private modalController: ModalController, private apis:ApisService) {}

    async openQrModal() {
      const modal = await this.modalController.create({
        component: QrModalComponent,
        componentProps: { qrData: this.qrData }
      });
      return await modal.present();
    }

    async caragarGrupo (){
      this.apis.getGrupos().subscribe(
        (data: any) => {
          this.grupos = data;
          console.log(this.grupos); // Verifica que sea un array
        },
        (error) => {
          //console.error('Error al cargar los grupos', error);
        }
      );
    }

    async caragarKids(){
      this.apis.getKids().subscribe(
        (data: any) => {
          this.kids = data;
          console.log(this.kids); // Verifica que sea un array
        },
        (error) => {
          //console.error('Error al cargar los grupos', error);
        }
      );
    }

}
 */

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.page.html',
  styleUrls: ['./adminprofile.page.scss'],
})
export class AdminprofilePage implements OnInit {

  constructor(private modalController: ModalController, private apis:ApisService) {}

  ngOnInit() {
    this.cargarGrupoYKids();
  }

  qrData: string = 'Omar Gonzalez Ruiz';
  grupos: any[] = [];
  kids: any[] = [];
  selectedGrupo: any; // Variable para guardar el grupo seleccionado

  async openQrModal() {
    const modal = await this.modalController.create({
      component: QrModalComponent,
      componentProps: { qrData: this.qrData }
    });
    return await modal.present();
  }

  async cargarGrupoYKids() {
    this.apis.getGrupos().subscribe(
      (data: any) => {
        this.grupos = data;
        //console.log(this.grupos); // Verifica que sea un array
      },
      (error) => {
        //console.error('Error al cargar los grupos', error);
      }
    );

    this.apis.getKids().subscribe(
      (data: any) => {
        this.kids = data;
        console.log(this.kids); // Verifica que sea un array
      },
      (error) => {
        //console.error('Error al cargar los grupos', error);
      }
    );
  }

  // Función para manejar el cambio en el selector de grupo
  async onChangeGrupo(event:any) {
    this.selectedGrupo = event.target.value;
  }

}
