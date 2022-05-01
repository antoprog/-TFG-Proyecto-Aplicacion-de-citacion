import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Agenda} from "../modelo/agenda";
import {Observable} from "rxjs";
import {CalendarEvent} from "calendar-utils";

@Injectable({
    providedIn: 'root'
})
export class AgendaService {

    constructor(private http: HttpClient) {
    }

    private URL = 'http://localhost:4001/agenda'

    public getAgendaByPsicologo(psicologo:any): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>(this.URL + '/getByPsicologo/'+psicologo)
    }
}
