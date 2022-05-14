import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../servicios/navbar-clientes.service";
import {AuthService} from "../../servicios/auth.service";
import {Router} from "@angular/router";
import {DataShareService} from "../../servicios/data-share.service";
import {ToastrService} from "ngx-toastr";

export interface Dat {
    _id: string,
    nomApe1Ape2: string
}

@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})

export class CabeceraComponent implements OnInit {
    listaPantalla: any
    datos: any

    constructor(private servicioNavbar: NavbarClientesService,
                private authService: AuthService,
                private dataShare: DataShareService,
                private router: Router,
                private toastr:ToastrService) {
    }

    buscarCliente(val: any) {
        if (val.length > 2) {
            this.servicioNavbar.getDatos(val).subscribe((nombre) => {
                this.listaPantalla = []
                this.datos = []
                nombre.forEach((element: Dat) => {
                    this.listaPantalla.push(element.nomApe1Ape2);
                    this.datos.push(element);
                });
            })
        } else {
            this.listaPantalla = [];
            this.datos = [];
        }
    }

    selectEvent(item: any) {
        console.log(item);
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].nomApe1Ape2 === item) {
                this.dataShare._idPaciente$.next(this.datos[i]._id);
                localStorage.setItem('idPaciente', this.datos[i]._id)
                this.router.navigate(['/auth/psicologo']).then();
                break;
            }
        }
    }

    onChangeSearch(val: string) {
        this.buscarCliente(val);
    }

    onFocused(e: any) {
        e.target.value = ""
    }

    ngOnInit(): void {
        this.authService.getRoles().subscribe({
            next: value => {
                console.log('ROL USUARIO:', value);
                for (const rol of value) {
                    switch (rol) {
                        case 'admin':
                            this.admin = true;
                            break;
                        case 'psicologo':
                            this.psicologo = true;
                            break;
                        case 'user':
                            this.user = true;
                            break;
                    }
                }
            },
            error: err => {
                if (err.status === 0) {
                    this.toastr.error('', "ERROR EN EL SERVIDOR")
                    return;
                }

                this.toastr.error(`[SERVIDOR] ${err.error.message}`, `[SERVIDOR] ${err.error.status}`)
            }
        })
    }

    logout() {
        this.authService.logout();
    }

    admin: any
    psicologo: any
    user: any
}
