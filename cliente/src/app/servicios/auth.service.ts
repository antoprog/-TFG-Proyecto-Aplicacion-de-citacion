import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

export interface Persona {
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
}

export interface RolesPrueba {
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4001/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(user: any) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  singin(user: any) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']).then();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin(): Observable<any> {
    return this.http.get(this.URL + '/checkRole/admin');
  }

  isPsicologo(): Observable<any> {
    return this.http.get(this.URL + '/checkRole/psicologo');
  }

}
