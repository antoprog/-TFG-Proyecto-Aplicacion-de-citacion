import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../modelo/paciente";

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  constructor(private http:HttpClient) { }

  altaPsicologo(datos:any){
    console.log(datos);
    return this.http.post('http://localhost:4001/psicologo/', datos);
  }
  altaPaciente(datos:any){
    console.log(datos);
    return this.http.post('http://localhost:4001/paciente/', datos);
  }
}
