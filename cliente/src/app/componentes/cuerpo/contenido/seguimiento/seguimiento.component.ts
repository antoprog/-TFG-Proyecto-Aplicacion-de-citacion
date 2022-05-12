import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {DataShareService} from 'src/app/servicios/data-share.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
    constructor(private fb: FormBuilder,
                private bbdd: BbddService,
                private dataShare: DataShareService,
                private pipedate: DatePipe) {

    }

    sus2: any

    ngOnInit(): void {
        this.cargarPantalla();
    }

    ngOnDestroy(): void {
        this.sus2.unsubscribe();
    }

    tablaSeguimientos: String[] = []
    datosPaciente: any

    seguimientoForm = this.fb.group({
        observaciones_cita: [''],
        observaciones_propias: [''],
        conducta_a_seguir: [''],
        fecha_p_cita: [''],
        inicio_p_cita: [''],
        fin_p_cita: ['']
    })


    cargarPantalla() {
        this.sus2 = this.dataShare.paciente$.subscribe(
            {
                next: value => {
                    if (value) {
                        const ruta = value.datosMedicos?.valoracion[parseInt(localStorage.getItem('valoracionId')!)]
                        this.datosPaciente = ruta

                        let fechaFormateada: string | null;

                        this.tablaSeguimientos = []
                        for (const rutaElement of ruta.seguimiento) {
                            if (rutaElement.fecha_cita !== undefined) {
                                fechaFormateada = this.pipedate.transform(rutaElement.fecha_cita, 'dd-MM-yyyy');
                            }
                            this.tablaSeguimientos.push(fechaFormateada!)
                        }

                        this.cargarDatos(ruta.seguimiento[ruta.seguimiento.length - 1])
                    }
                }
            }
        )
    }

    guardar() {
        this.bbdd.modificarSeguimiento(this.seguimientoForm.value).subscribe()

        setTimeout(() => {
            this.dataShare._idPaciente$.next(String(localStorage.getItem('idPaciente')))
        }, 1500)
    }

    cambiarValoracion(evento: any) {
        for (const seguimiento of this.datosPaciente.seguimiento) {
            if (evento.value === this.pipedate.transform(seguimiento.fecha_cita, 'dd-MM-yyyy')) {
                this.cargarDatos(seguimiento)
            }
        }
    }

    cargarDatos(seguimiento: any) {
        this.seguimientoForm.controls['observaciones_cita'].setValue(seguimiento?.observaciones)
        this.seguimientoForm.controls['observaciones_propias'].setValue(seguimiento?.anotaciones)
        this.seguimientoForm.controls['conducta_a_seguir'].setValue(seguimiento?.conducta_a_seguir)
        this.seguimientoForm.controls['fecha_p_cita'].setValue(seguimiento?.fecha_prox_cita)
        this.seguimientoForm.controls['inicio_p_cita'].setValue(seguimiento?.hora_inicio_cita)
        this.seguimientoForm.controls['fin_p_cita'].setValue(seguimiento?.hora_fin_cita)
    }
}
