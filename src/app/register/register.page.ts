import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  lastname: string = '';
  edad: number = 0;
  grupo: string ='';

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  async register() {
    // Valida los datos del formulario antes de registrar al usuario
    if (!this.username || !this.lastname || !this.grupo || !this.edad) {
      // Verifica si alguno de los campos está vacío
      this.presentToast('Por favor, rellena todos los campos');
      return;
    }

    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Registrando usuario con nombre:', this.username, 'y apellido:', this.lastname);
    
    // Simula un registro exitoso (aquí deberías agregar tu lógica real de registro)
    // Suponiendo que se realizó el registro con éxito, ahora mostramos la notificación
    await this.presentToast('¡Registro exitoso!');

    // Redirecciona al usuario a la página de tabs después del registro
    this.router.navigate(['/tabs']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos que se mostrará el toast
      position: 'top' // Posición en la pantalla ('top', 'bottom' o 'middle')
    });
    toast.present();
  }
}
