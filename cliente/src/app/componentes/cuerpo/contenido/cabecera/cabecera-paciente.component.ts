import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BbddService} from "../../../../servicios/bbdd.service";
import {Paciente} from "../../../../modelo/paciente";
import {Router} from "@angular/router";
import {DataShareService} from "../../../../servicios/data-share.service";

@Component({
    selector: 'app-cabecera-paciente',
    templateUrl: './cabecera-paciente.component.html',
    styleUrls: ['./cabecera-paciente.component.css']
})
export class CabeceraPacienteComponent implements OnInit {

    constructor(private servicio: BbddService,
                private dataShare: DataShareService) {
    }

    diagnostico: String[] = []
    data: Paciente | undefined
    edad = 0

    ngOnInit(): void {
        this.dataShare._idPaciente.subscribe( value => {
            if (value !== '') {
                this.obtenerDatosPaciente(value)
                this.obtenerDiagnosticos(value)
            }
        });
        console.log('carga-menu-paciente');
    }

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    obtenerDatosPaciente(id:any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe({
            next: value => {
                this.data = value
                this.edad = this.calcularEdad(this.data?.fecha_nacimiento)
                this.edad = this.edad || 0
            },
            error: err => {
                console.log('MENU-PACIENTE', err);
            },
            complete: () => {
            }
        });
    }

    obtenerDiagnosticos(id:any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe(
            {
                next: value => {
                    console.log('AAAAAA',value);
                    console.log(value);
                    for (let valoracion of value.datosMedicos.valoracion) {
                        //this.diagnostico.push(valoracion.diagnostico_psicologico.diagnostico)
                        console.log(valoracion);
                    }
                    // this.diagnostico = this.diagnostico.sort(function (a, b) {
                    //     if (a < b) {
                    //         return 1;
                    //     }
                    //     if (a > b) {
                    //         return -1;
                    //     }
                    //     return 0;
                    // })
                }
            }
        )
    }
}
