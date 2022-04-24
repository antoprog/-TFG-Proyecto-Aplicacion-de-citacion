import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../../servicios/navbar-clientes.service";
import {AuthService} from "../../../servicios/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    constructor(private servicio: NavbarClientesService,
                private authService: AuthService,) {
    }

    data: any;

    buscarCliente(val: any) {
        if (val.length > 2) {
            this.servicio.getDatos(val).subscribe((nombre) => {
                this.data = [];
                nombre.forEach((element: any) => {
                    this.data.push(element.name);
                });
            })
        } else {
            this.data = [];
        }
    }

    selectEvent(item: any) {
        // do something with selected item
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
                if (value.includes("admin"))
                console.log('CABECERA',value);
                // switch (value) {
                //     case 'Token caducado':
                //         console.log('Token caducado');
                //         //this.logout();
                //         break;
                //     case 'Unauthorized':
                //         console.log('Unauthorized');
                //         //this.logout();
                //         break;
                // }
                this.admin = true
            },
            error: err => {
                console.log('ERROR VERIFY ADMIN', err);
            }
        })

        // this.authService.isPsicologo().subscribe({
        //     next: value => {
        //         this.psicologo = true
        //     },
        // })
    }

    logout() {
        this.authService.logout();
    }
}
