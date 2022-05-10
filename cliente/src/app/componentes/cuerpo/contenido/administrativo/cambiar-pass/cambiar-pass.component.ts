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
                    this.toastr.success('',"Contraseña modificada correctamente")
                    console.log(value);
                },
                error: err => {
                    this.toastr.error('Error', "Contraseña no modificada . Código: "+err.status )
                    console.log(err.error.message);
                }
            })
        }else{
            this.toastr.error('', "Las contraseñas no coinciden")
        }
    }

}
