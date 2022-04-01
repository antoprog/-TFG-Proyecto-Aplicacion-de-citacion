import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavbarClientesService {



  constructor(private http: HttpClient) { }

  getNombreClientes() {
    let dato;
    return this.http.get('http://localhost:4343/listaClientes');
  }
}
