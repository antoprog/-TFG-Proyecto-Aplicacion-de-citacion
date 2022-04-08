import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavbarClientesService {

  constructor(private http: HttpClient) {}

  getDatos(nombre:string){
      return this.http.get<any[]>('http://localhost:4343/unos/'+nombre);
  }
}
