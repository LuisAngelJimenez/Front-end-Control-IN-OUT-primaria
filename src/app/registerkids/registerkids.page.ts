import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-register',
  templateUrl: './registerkids.page.html',
  styleUrls: ['./registerkids.page.scss'],
})
export class RegisterkidsPage implements OnInit {
  formCat!: FormGroup;

  constructor(private router: Router, private toastController: ToastController,
    private fb: FormBuilder,) {}

  ngOnInit() {
    this.crearForm();
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
    });}
  
}