import {Component, OnInit} from '@angular/core';
import {BbddService} from "../../../../servicios/bbdd.service";

@Component({
    selector: 'app-menu-paciente',
    templateUrl: './menu-paciente.component.html',
    styleUrls: ['./menu-paciente.component.css']
})
export class MenuPacienteComponent implements OnInit {

    constructor(private servicio: BbddService) {
    }

    diagnostico: String[] = []

    ngOnInit(): void {
        this.servicio.getDatosMedicosPaciente('fernando').subscribe(
            {
                next: value => {

                    for (let valoracion of value.datosMedicos.valoracion) {
                        this.diagnostico.push(valoracion.diagnostico_psicologico.diagnostico)
                    }

                    this.diagnostico = this.diagnostico.sort(function (a, b) {
                        if (a < b) {
                            return 1;
                        }
                        if (a > b) {
                            return -1;
                        }
                        return 0;
                    })

                }
            }
        )
    }
}
