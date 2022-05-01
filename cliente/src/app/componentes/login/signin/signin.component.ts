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
        this.servicio.singin(this.user).subscribe({
            next: value => {
                this.toastr.success('', "Login bien")
                console.log('Login:', value.token);
                localStorage.setItem('token', value.token);
                this.router.navigate(['/auth/agenda']).then();
            },
            error: err => {
                this.toastr.error('', "Los datos son incorrectos.")
                console.log(err.status, err.error.message)
            },
            complete:() => {
            }
        })
    }
}
