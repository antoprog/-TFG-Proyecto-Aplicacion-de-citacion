import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../servicios/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-cambiar-pass',
    templateUrl: './cambiar-pass.component.html',
    styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {

    constructor(private authService: AuthService,
                private toastr:ToastrService) {
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
                    this.toastr.success("pepe", "pepe1")
                    console.log(value);
                },
                error: err => {
                    console.log(err.error.message);
                }
            })
        }else{
            this.toastr.error('', "Las contraseñas no coinciden")
        }
    }

}
