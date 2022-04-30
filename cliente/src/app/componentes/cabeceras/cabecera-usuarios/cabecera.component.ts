import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../../servicios/navbar-clientes.service";
import {AuthService} from "../../../servicios/auth.service";
import {Router} from "@angular/router";
import {DataShareService} from "../../../servicios/data-share.service";

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

    constructor(private servicio: NavbarClientesService,
                private authService: AuthService,
                private dataShare: DataShareService,
                private router: Router) {
    }

    buscarCliente(val: any) {
        if (val.length > 2) {
            this.servicio.getDatos(val).subscribe((nombre) => {
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
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].nomApe1Ape2 === item) {
                this.dataShare._idPaciente$.next(this.datos[i]._id);
                localStorage.setItem('idPaciente', this.datos[i]._id)
                this.router.navigate(['/psicologo']).then();
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
                console.log('CABECERA VALUE', value);
                this.admin = true
                for (const rol of value) {
                    switch (rol) {
                        case 'admin':
                            console.log('entra 1');
                            this.admin = true;
                            break;
                        case 'psicologo':
                            console.log('entra 2');
                            this.psicologo = true;
                            break;
                        case 'user':
                            console.log('entra 3');
                            this.user = true;
                            break;
                    }
                }
            },
            error: err => {
                console.log('ERROR VERIFY ADMIN', err);
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
