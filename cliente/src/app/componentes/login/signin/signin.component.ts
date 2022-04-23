import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../servicios/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    signIn() {
        this.servicio.singin(this.user)
            .subscribe(
                res => {
                    this.toastr.error('', "Login bien")
                    console.log('Login:', res.token);
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['.']).then();
                   // window.location.reload();
                },
                error => {
                    console.log(error.status, error.error.message)
                    this.toastr.error('', "Los datos son incorrectos.")
                }
            )
    }
}
