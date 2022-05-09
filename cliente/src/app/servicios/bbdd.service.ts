import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../modelo/paciente";
import {Psicologo} from '../modelo/psicologo';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BbddService {

    constructor(private http: HttpClient) {
    }

    altaPsicologo(datos: any) {
        return this.http.post('http://localhost:4001/psicologo/', datos);
    }

    altaPaciente(datos: any) {
        return this.http.post('http://localhost:4001/paciente/', datos);
    }

    altaConsultaPaciente(consultaDatos:any) {
        console.log('entra servicio');
        let url = 'http://localhost:4001/paciente/altaConsulta/' + localStorage.getItem('idPaciente')
        console.log(url);
        return this.http.put(url, consultaDatos)
    }

    modificarConsultaPaciente(consultaDatos:any, valoracion:any) {
        let url = 'http://localhost:4001/paciente/modificacionConsulta/' + localStorage.getItem('idPaciente') + '/' + valoracion
        return this.http.put(url, consultaDatos)
    }

    getPaciente(paciente: any): Observable<Paciente> {
        return this.http.get<Paciente>('http://localhost:4001/paciente/' + paciente)
    }

    getDatosPsicologo(): Observable<Psicologo> {
        return this.http.get<Psicologo>('http://localhost:4001/psicologo/uno/')
    }

    getPsicologos(){
        return this.http.get<Psicologo[]>('http://localhost:4001/psicologo/')
    }

    getPsicologoByUser(username:string): Observable<Psicologo> {
        return this.http.get<Psicologo>('http://localhost:4001/psicologo/byUser/' + username)
    }

    modificarAntecedentes(consultaDatos:any) {
        let url = 'http://localhost:4001/paciente/modificarAntecedentes/:valoracionId' + localStorage.getItem('idPaciente')
        return this.http.put(url, consultaDatos)
    }

    modificarPruebas(consultaDatos:any) {
        let url = 'http://localhost:4001/paciente/modificarPruebas/:valoracionId' + localStorage.getItem('idPaciente')
        return this.http.put(url, consultaDatos)
    }

    modificarSeguimiento(consultaDatos:any) {
        let url = 'http://localhost:4001/paciente/modificarSeguimiento/:valoracionId' + localStorage.getItem('idPaciente')
        return this.http.put(url, consultaDatos)
    }
    modificarPsicologoById(datos:any, psicologoId:String){
        let url = 'http://localhost:4001/psicologo/' + psicologoId
        return this.http.put(url, datos)  
    }
    modificarPacienteById(datos:any,pacienteId:String){
        let url = 'http://localhost:4001/paciente/actualizarPaciente/' + pacienteId
        return this.http.put(url, datos)
    }
}
