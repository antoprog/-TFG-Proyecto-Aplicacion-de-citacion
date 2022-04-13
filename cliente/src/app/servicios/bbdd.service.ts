import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../modelo/paciente";

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  constructor(private http:HttpClient) { }

  guardar(datos:Paciente){
    console.log(datos);
    return this.http.post<Paciente>('http://localhost:4343/alta', datos);
  }
}
