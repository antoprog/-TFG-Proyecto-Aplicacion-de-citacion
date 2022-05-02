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
        this.primeravez = true
        console.log('ENTRA ONINIT CABECERA PACIENTE', this.primeravez);

        this.tablaDiagnosticos = []
        this.suscripcion = this.dataShare._idPaciente$.subscribe(value => {
            console.log('entra a la suscripcion');
            if (value !== '') {
                console.log('entra suscripcion 1');
                this.obtenerDiagnosticos(value)
            } else if (localStorage.getItem('idPaciente')) {
                console.log('entra suscripcion 2');
                this.obtenerDiagnosticos(localStorage.getItem('idPaciente'))
            }
        });
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe()
        if (this.suscripcionCambiaValoracion) {
            this.suscripcionCambiaValoracion.unsubscribe()
        }
        this.primeravez = false
    }

    tablaDiagnosticos: Valoracion[] = []
    data: Paciente | undefined
    edad = 0

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    obtenerDiagnosticos(id: any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe(
            {
                next: value => {
                    this.tablaDiagnosticos = []
                    this.data = undefined
                    this.edad = 0

                    // Datos para la cabecera del paciente
                    this.data = value
                    this.edad = this.calcularEdad(this.data.fecha_nacimiento)
                    this.edad = this.edad || 0
                    // Datos para la cabecera del paciente

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
                        console.log('ANTES DEL NUEVO DATA SHARE PACIENTE');
                        this.dataShare.paciente$.next(this.data)
                    }

                    if (this.primeravez) {
                        this.primeravez = false
                        console.log('ENTRA A PRIMERA VEZ');
                        if (this.data.datosMedicos.valoracion.length > 0)
                            this.dataShare._valoracion$.next(this.data.datosMedicos.valoracion.length - 1);
                        else
                            this.dataShare._valoracion$.next(0)
                    }
                    // Recuperar las valoraciones del paciente
                }
            }
        )
    }

    cambiarValoracion(evento: any) {
        const indice = (evento.length - 1) - evento.selectedIndex
        this.dataShare._valoracion$.next(indice);
        localStorage.setItem('valoracionId', String(indice))
    }
}
