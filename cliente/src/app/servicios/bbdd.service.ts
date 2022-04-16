import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../modelo/paciente";
import { Psicologo } from '../modelo/psicologo';

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  constructor(private http:HttpClient) { }

  altaPsicologo(datos:any){
    return this.http.post('http://localhost:4001/psicologo/', datos);
  }
  altaPaciente(datos:any){
    return this.http.post('http://localhost:4001/paciente/', datos);
  }
  getDatosMedicosPaciente(paciente:any){
    return this.http.get<Paciente>('http://localhost:4001/paciente/uno/'+paciente)
  }
  getDatosPsicoligo(psicologo:any){
    return this.http.get<Psicologo>('http://localhost:4001/psicologo/uno/'+psicologo)
  }
}
