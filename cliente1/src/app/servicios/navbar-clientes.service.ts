import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarClientesService {

  constructor(private http: HttpClient) { }

  getNombreClientes(nombre:string) {
    return this.http.get('http://localhost:4343/unos/'+nombre);
  }

  getDatos(nombre:string){
    return this.http.get('http://localhost:4343/unos/'+nombre)
      .pipe(retry(3),
        catchError(this.handleError));
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `[CLIENTE] Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `[SERVIDOR] No es posible acceder al servidor. Contacte con el administrador.`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
