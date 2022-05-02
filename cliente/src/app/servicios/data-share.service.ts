import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Paciente} from "../modelo/paciente";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
    public _idPaciente$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public _valoracion$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public paciente$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
}
