import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
    public _idPaciente: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
