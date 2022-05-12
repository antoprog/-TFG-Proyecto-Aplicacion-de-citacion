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

    primeravez: any;
    suscripcion: any
    suscripcionCambiaValoracion: any

    ngOnInit(): void {
        this.tablaDiagnosticos = []
        this.suscripcion = this.dataShare._idPaciente$.subscribe(value => {
            if (value !== '') {
                this.obtenerDiagnosticos(value)
            } else if (localStorage.getItem('idPaciente')) {
                this.obtenerDiagnosticos(localStorage.getItem('idPaciente'))
            }
        });
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe()
        if (this.suscripcionCambiaValoracion) {
            this.suscripcionCambiaValoracion.unsubscribe()
        }
    }

    tablaDiagnosticos: Valoracion[] = []
    data: Paciente | undefined
    edad = 0

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    obtenerDiagnosticos(id: any) {
        this.servicio.getPaciente(id).subscribe(
            {
                next: value => {
                    this.tablaDiagnosticos = []
                    this.data = undefined
                    this.edad = 0

                    // Datos para la cabecera del paciente
                    this.data = value
                    localStorage.setItem('valoracionId', String(this.data.datosMedicos.valoracion.length - 1))
                    this.edad = this.calcularEdad(this.data.fecha_nacimiento)
                    this.edad = this.edad || 0
                    // Datos para la cabecera del paciente

                    console.log('PACIENTE CABECERA', value.nombre);
                    // Recuperar las valoraciones del paciente
                    for (const [index, dato] of value.datosMedicos.valoracion.entries()) {
                        let fechaFormateada;
                        if (dato.fecha_inicio !== undefined) {
                            fechaFormateada = this.datepipe.transform(dato.fecha_inicio, 'dd/MM/yyyy');
                        }

                        let registro: Valoracion = {
                            ordenI: index,
                            diagnosticoI: dato.diagnostico_psicologico?.diagnostico || 'En valoración',
                            fechaInicioI: fechaFormateada || ''
                        }

                        this.tablaDiagnosticos.push(registro)
                    }

                    this.dataShare.paciente$.next(this.data)
                    // Recuperar las valoraciones del paciente
                }
            }
        )
    }

    cambiarValoracion(evento: any) {
        const indice = (evento.length - 1) - evento.selectedIndex
        localStorage.setItem('valoracionId', String(indice))
        this.dataShare.paciente$.next(this.data)
    }

    cerrarValidacion() {

    }
}
