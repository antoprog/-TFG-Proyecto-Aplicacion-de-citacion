import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../../servicios/navbar-clientes.service";
import {AuthService} from "../../../servicios/auth.service";
import {Router} from "@angular/router";

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
    constructor(private servicio: NavbarClientesService,
                private authService: AuthService,
                private router: Router) {
    }

    listaPantalla: any
    datos: any

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
                localStorage.removeItem('paciente')
                localStorage.setItem('paciente', this.datos[i]._id)
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

    admin: any
    psicologo: any

    ngOnInit(): void {
        this.authService.getRoles().subscribe({
            next: value => {
                console.log('CABECERA', value);
                this.admin = true
            },
            error: err => {
                console.log('ERROR VERIFY ADMIN', err);
            }
        })
    }

    logout() {
        this.authService.logout();
    }

    actualizarPagina() {
       window.location.reload();
    }
}
