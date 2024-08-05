  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { ToastController } from '@ionic/angular';
  import { ApisService } from '../services/apis.service';

  @Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
  })
  export class RegisterPage implements OnInit {
    formCat!: FormGroup;
    selectedFile: File | undefined;

    constructor(
      private api: ApisService,
      private router: Router,
      private fb: FormBuilder,
      private toastController: ToastController
    ) {}

    ngOnInit() {
      this.crearForm();
    }

    crearForm() {
      this.formCat = this.fb.group({
        name: ['', Validators.required],
        flastname: ['', Validators.required],
        slastname: ['', [Validators.required]],
        birthdate: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        curp: ['', [Validators.required, Validators.minLength(18)]],
        number: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
        img: ['placeholder', Validators.required],
        file: ['', Validators.required],
        folder: ['tutors', Validators.required],
        rol: ['', Validators.required],
      });
    }

    async submit() {
      if (this.formCat.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('name', this.formCat.value.name);
        formData.append('flastname', this.formCat.value.flastname);
        formData.append('slastname', this.formCat.value.slastname);
        formData.append('birthdate', this.formCat.value.birthdate);
        formData.append('phone', this.formCat.value.phone);
        formData.append('email', this.formCat.value.email);
        formData.append('curp', this.formCat.value.curp);
        formData.append('number', this.formCat.value.number);
        formData.append('street', this.formCat.value.street);
        formData.append('neighborhood', this.formCat.value.neighborhood);
        formData.append('city', this.formCat.value.city);
        formData.append('zip', this.formCat.value.zip);
        formData.append('img', this.formCat.value.img);
        formData.append('folder', this.formCat.value.folder);
        formData.append('rol', this.formCat.value.rol);

        this.api.crearTutors(formData).subscribe(
          async (resp) => {
            console.log('Creando tutor', resp);
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
