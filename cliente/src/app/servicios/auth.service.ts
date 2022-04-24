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

export interface Roles {
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
    this.router.navigate(['/']).then();
  }

  getToken() {
    return localStorage.getItem('token');
  }

   getRoles(): Observable<[String]> {
      this.http.get<Roles>(this.URL + '/getRoles/').subscribe({
          next: value => {
              console.log('SERVICIO RESULTADO ROLES:', value);
          },
          error: err => {
              console.log(err);
          }
      })

      return this.http.get<[String]>(this.URL + '/getRoles/');
  }

  changePassword(data:any){
      return this.http.put(this.URL + '/changePassword', data)
  }
}
