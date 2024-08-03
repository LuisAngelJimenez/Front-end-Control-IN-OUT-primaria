import { Component } from '@angular/core';

interface Chico{
  name:string,
  group:string,
  age: number,

}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isModalOpen = false;

  chamaco:Chico[]=[
    {
    name: "Luis Angel",
    group: "1A",
    age: 9,
  },
  {
    name: "Jose ",
    group: "2B",
    age: 10,
  },
  {
    name: "Dani ",
    group: "1B",
    age: 9,
  },
  {
    name: "Conchis ",
    group: "2B",
    age: 11,
  }
]
selected:Chico|null= null;

  personas = [
    { nombre: 'Jesus Perez', edad: 10, email: 'jesus@gmail.com',grupo:'B',tutor:'Susana Perez' },
    { nombre: 'Omar Arellanes', edad: 12, email: 'omar@gmail.com',grupo:'A',tutor:'Alex Arellanes' },
    { nombre: 'Saul Uziel', edad: 9, email: 'saul@gmail.com',grupo:'C',tutor:'Isidro Uziel' },
    { nombre: 'Luis Diaz', edad: 7, email: 'luis@gmail.com',grupo:'A',tutor:'Bruno Diaz' }
  ];

  constructor() {}

  setOpen(isOpen: boolean,chico:Chico|null=null) {
    this.isModalOpen = isOpen;
    this.selected = chico;
    console.log(this.selected);
  }

}
