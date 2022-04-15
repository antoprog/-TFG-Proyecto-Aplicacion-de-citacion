import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

    constructor(
        private servicio: AuthService,
        private router:Router
        ) {
    }

    ngOnInit(): void {
    }

    signUp() {
        this.servicio.signup(this.user)
            .subscribe({
                complete: () => {console.log("Registro completado.")}, // completeHandler
                error: a => {
                    console.log('Error:',a);},
                next: a => {
                    console.log('Next:',a);
                    localStorage.setItem('token', a.token);
                    this.router.navigate(['/privado']).then();
                },
            });
    }
}
