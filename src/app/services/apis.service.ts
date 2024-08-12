import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }

  private apiURL= 'https://e2e1-177-238-23-184.ngrok-free.app'

  getUser(){ //ESTE ES LA API PARA MANDAR A LLAMAR A LOS TUTORES
    return this.http.get(`${this.apiURL}/api/tutors`)
  }

  crearTutors(data: FormData){ //ESTE ES LA API PARA CREAR A LOS TUTORES
    console.log(data)
    return this.http.post(`${this.apiURL}/api/tutors`,data)
  }

  getKids(){ //API PARA MANDAR A LLAMAR A LOS NIÑOS
    return this.http.get(`${this.apiURL}/api/kids`)
  }

  crearKids(data: FormData){
    console.log(data)
    return this.http.post(`${this.apiURL}/api/kids`,data)
  }

  getGrupos(){
    return this.http.get(`${this.apiURL}/api/groups`)
  }

  updateKidStatus(kidId: string, isActive: boolean) {
    return this.http.put(`${this.apiURL}/api/kids/${kidId}/status`, { is_active: isActive });
  }


}
