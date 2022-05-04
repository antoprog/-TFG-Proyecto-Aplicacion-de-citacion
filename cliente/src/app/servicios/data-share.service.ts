import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Paciente} from "../modelo/paciente";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
    public _idPaciente$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public paciente$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
}
