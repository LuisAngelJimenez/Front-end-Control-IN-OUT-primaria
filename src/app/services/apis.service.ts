import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }


  getUser(){ //ESTE ES LA API PARA MANDAR A LLAMAR A LOS TUTORES
    return this.http.get('http://localhost:3000/api/tutors')
  }

  crearTutors(data: FormData){ //ESTE ES LA API PARA CREAR A LOS TUTORES
    console.log(data)
    return this.http.post('http://localhost:3000/api/tutors',data)
  }

  getKids(){ //API PARA MANDAR A LLAMAR A LOS NIÑOS
    return this.http.get('http://localhost:3000/api/kids')
  }

  crearKids(data: FormData){
    console.log(data)
    return this.http.post('http://localhost:3000/api/kids',data)
  }

  getGrupos(){
    return this.http.get('http://localhost:3000/api/groups')
  }

}
