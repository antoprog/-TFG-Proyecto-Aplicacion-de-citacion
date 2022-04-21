import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../servicios/auth.service";

@Component({
    selector: 'app-cambiar-pass',
    templateUrl: './cambiar-pass.component.html',
    styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    user = {
        passActual: '',
        passNew: '',
        passNew2: ''
    }

    cambiarPass() {
        if (this.user.passNew === this.user.passNew2) {
            this.authService.changePassword(this.user).subscribe({
                next: value => {
                    console.log(value);
                },
                error: err => {
                    console.log(err.error.message);
                }
            })
        }else{
            console.log('las contraseñas no coinciden');
        }
    }

}
