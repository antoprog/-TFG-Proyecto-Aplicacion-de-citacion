import {Component, OnInit} from '@angular/core';
import {Psicologo} from 'src/app/modelo/psicologo';
import {BbddService} from "../../../../servicios/bbdd.service";
import {AuthService} from "../../../../servicios/auth.service";

@Component({
    selector: 'app-mis-datos',
    templateUrl: './mis-datos.component.html',
    styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
    constructor(private servicio: BbddService, private authService: AuthService) {
    }

    visible: any

    mostrar() {
        this.visible = !this.visible;
    }

    psico: any

    ngOnInit(): void {
        this.servicio.getDatosPsicologo(this.authService.getToken()).subscribe(
            (respuesta: Psicologo) => {
                this.psico = respuesta
                console.log(respuesta)
            }
        )
    }

}
