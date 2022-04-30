import {Component, OnDestroy, OnInit} from '@angular/core';
import {BbddService} from "../../../../servicios/bbdd.service";
import {Paciente} from "../../../../modelo/paciente";
import {DataShareService} from "../../../../servicios/data-share.service";
import {DatePipe} from '@angular/common'

export interface Valoracion {
    ordenI: number,
    diagnosticoI: String,
    fechaInicioI: String,
}

@Component({
    selector: 'app-cabecera-paciente',
    templateUrl: './cabecera-paciente.component.html',
    styleUrls: ['./cabecera-paciente.component.css']
})
export class CabeceraPacienteComponent implements OnInit, OnDestroy {

    constructor(private servicio: BbddService,
                private dataShare: DataShareService,
                private datepipe: DatePipe) {
    }

    suscripcion: any

    ngOnInit(): void {
        this.tablaDiagnosticos = []

        this.suscripcion = this.dataShare._idPaciente$.subscribe(value => {
            console.log('CREA COMPONENTE', value);
            if (value !== '') {
                this.obtenerDatosPaciente(value)
                this.obtenerDiagnosticos(value)
            }else if (localStorage.getItem('idPaciente')){
                this.obtenerDatosPaciente(localStorage.getItem('idPaciente'))
                this.obtenerDiagnosticos(localStorage.getItem('idPaciente'))
            }
        });
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe()
    }

    tablaDiagnosticos:Valoracion[] = []
    data: Paciente | undefined
    edad = 0

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    obtenerDatosPaciente(id: any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe({
            next: value => {
                this.data = value
                this.edad = this.calcularEdad(this.data.fecha_nacimiento)
                this.edad = this.edad || 0
            },
            error: err => {
                console.log('MENU-PACIENTE', err);
            },
            complete: () => {
            }
        });
    }

    obtenerDiagnosticos(id: any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe(
            {
                next: value => {
                    this.tablaDiagnosticos = []
                    console.log(value);
                    for (let i = value.datosMedicos.valoracion.length - 1; i >= 0; i--) {
                        let valoracion = value.datosMedicos.valoracion[i];
                        let fechaFormateada;
                        if (valoracion.fecha_inicio !== undefined) {
                            fechaFormateada = this.datepipe.transform(valoracion.fecha_inicio, 'dd/MM/yyyy');
                        }

                        let registro : Valoracion = {
                            ordenI: i,
                            diagnosticoI: valoracion.diagnostico_psicologico?.diagnostico || 'En valoración',
                            fechaInicioI: fechaFormateada || ''
                        }

                        this.tablaDiagnosticos.push(registro);
                    }

                    localStorage.setItem('valoracionId', String(this.tablaDiagnosticos[0]?.ordenI))
                }
            }
        )
    }

    cambiarValoracion(evento: any) {
        const all = this.tablaDiagnosticos.filter((obj) => {
            return obj.diagnosticoI === evento.value.split('-')[0].trim()
        })

        let pos = all.map(function(e) { return e.fechaInicioI; }).indexOf(evento.value.split('-')[1].trim())

        this.dataShare._valoracion$.next(all[pos].ordenI);

        localStorage.setItem('valoracionId', String(all[pos].ordenI))

    }
}
