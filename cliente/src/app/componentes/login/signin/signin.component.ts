import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    username: '',
    password: ''
  }

  constructor(private servicio: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  signIn() {
    this.servicio.singin(this.user)
      .subscribe(
        res => {
          console.log('Login:', res.token);
          localStorage.setItem('token', res.token);
          window.location.reload();
        },
        error => console.log(error.status, error.error.message)
      )
  }
}
