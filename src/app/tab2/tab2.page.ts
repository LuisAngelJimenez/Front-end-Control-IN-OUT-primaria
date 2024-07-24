import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  personas = [
    { nombre: 'Jesus Perez', edad: 10, email: 'jesus@gmail.com',grupo:'B',tutor:'Susana Perez' },
    { nombre: 'Omar Arellanes', edad: 12, email: 'omar@gmail.com',grupo:'A',tutor:'Alex Arellanes' },
    { nombre: 'Saul Uziel', edad: 9, email: 'saul@gmail.com',grupo:'C',tutor:'Isidro Uziel' },
    { nombre: 'Luis Diaz', edad: 7, email: 'luis@gmail.com',grupo:'A',tutor:'Bruno Diaz' }
  ];

  constructor() {}

}
