import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController
import { ApisService } from '../services/apis.service';


@Component({
  selector: 'app-register',
  templateUrl: './registerkids.page.html',
  styleUrls: ['./registerkids.page.scss'],
})
export class RegisterkidsPage implements OnInit {
  formCat!: FormGroup;
  selectedFile: File | undefined;
  tutors: any[] = [];
  grupos: any[] = [];

  constructor(private router: Router, private api: ApisService, private toastController: ToastController,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.crearForm();
    this.loadTutors();
    this.loadGrupos();
  }

  async loadTutors() {
    this.api.getUser().subscribe(
      (data: any) => {
        this.tutors = data;
        //console.log(this.tutors); // Verifica que sea un array
      },
      (error) => {
        //console.error('Error al cargar los tutores', error);
      }
    );
  }

  async loadGrupos() {
    this.api.getGrupos().subscribe(
      (data: any) => {
        this.grupos = data;
        //console.log(this.grupos); // Verifica que sea un array
      },
      (error) => {
        //console.error('Error al cargar los grupos', error);
      }
    );
  }


  async crearForm() {
    this.formCat = this.fb.group({
      name: ['', Validators.required],
      flastname: ['', Validators.required],
      slastname: ['', Validators.required],
      group: ['', Validators.required],
      tutor: ['', Validators.required],
      birthdate: ['', Validators.required],
      img: ['placeholder', Validators.required],
      file: ['', Validators.required],
      folder: ['kid', Validators.required],
    });
  }


async submit(){
  console.log(this.formCat.value)
  if (this.formCat.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('name', this.formCat.value.name);
    formData.append('flastname', this.formCat.value.flastname);
    formData.append('slastname', this.formCat.value.slastname);
    formData.append('group', this.formCat.value.group);
    formData.append('tutor', this.formCat.value.tutor);
    formData.append('birthdate', this.formCat.value.birthdate);
    formData.append('img', this.formCat.value.img);
    formData.append('folder', this.formCat.value.folder);

    console.log(formData);


    this.api.crearKids(formData).subscribe(
      async (resp) => {
        console.log('Creando al niño', resp);
        const toast = await this.toastController.create({
          message: '¡Registro exitoso!',
          duration: 2000,
          position: 'top',
        });
        await toast.present();
        this.router.navigate(['/tabs']);
      },
      async (error) => {
        console.error('Error en el registro:', error);
        const toast = await this.toastController.create({
          message: 'Error en el registro: ' + error.error.message,
          duration: 2000,
          position: 'top',
        });
        await toast.present();
      }
    );
  } else {
    const toast = await this.toastController.create({
      message: 'Por favor, completa todos los campos requeridos y selecciona un archivo.',
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

}
