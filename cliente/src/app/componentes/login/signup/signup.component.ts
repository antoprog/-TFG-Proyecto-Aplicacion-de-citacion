import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private servicio: AuthService) {
  }

  ngOnInit(): void {
  }

  signUp() {
    this.servicio.signup(this.user)
      .subscribe({
        complete: () => {
          console.log("Registro completado.")
        }, // completeHandler
        error: a => {
          console.log('Error:', a);
        },
        next: a => {
          localStorage.setItem('token', a.token);
        },
      });
  }
}
