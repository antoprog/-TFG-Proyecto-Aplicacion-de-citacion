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
        observaciones: [''],
        anotaciones: [''],
        conducta_a_seguir: [''],
        fecha_prox_cita: [''],
        hora_prox_cita: [''],
        fin_prox_cita: ['']
    })


    cargarPantalla() {
        console.log("a");
        
        this.sus2 = this.dataShare.paciente$.subscribe(
            {
                               
                next: value => {
                    if (value) {
                        const ruta = value.datosMedicos?.valoracion[parseInt(localStorage.getItem('valoracionId')!)]
                        this.seguimientoForm.controls['observaciones'].setValue(ruta?.seguimiento.observaciones)
                        this.seguimientoForm.controls['anotaciones'].setValue(ruta?.seguimiento.anotaciones)
                        this.seguimientoForm.controls['conducta_a_seguir'].setValue(ruta?.seguimiento.conducta_a_seguir)
                        this.seguimientoForm.controls['fecha_prox_cita'].setValue(ruta?.seguimiento.fecha_prox_cita)
                        this.seguimientoForm.controls['hora_prox_cita'].setValue(ruta?.seguimiento.hora_prox_cita)
                        this.seguimientoForm.controls['fin_prox_cita'].setValue(ruta?.seguimiento.fin_prox_cita)

                        this.datosPaciente = ruta

                        let fechaFormateada: string | null;

                        console.log(ruta.seguimiento.length);
                        console.log(ruta.seguimiento.length);

                        this.tablaSeguimientos = []
                        for (const rutaElement of ruta.seguimiento) {
                            if (rutaElement.fecha_cita !== undefined) {
                                fechaFormateada = this.pipedate.transform(rutaElement.fecha_cita, 'dd-MM-yyyy');
                            }
                            this.tablaSeguimientos.push(fechaFormateada!)
                        }

                        this.cargarDatos(ruta.seguimiento[ruta.seguimiento.length - 1])
                        console.log("b");
                    }
                }
            }
        )
    }

    guardar() {
        console.log("guardar", this.seguimientoForm.value);
        this.bbdd.altaSeguimiento(this.seguimientoForm.value, localStorage.getItem('valoracionId')).subscribe()
    }

    modificar() {
        console.log("modificar", this.seguimientoForm.value);
        this.bbdd.modificarSeguimiento(this.seguimientoForm.value, localStorage.getItem('valoracionId')).subscribe()
    }

    cambiarValoracion(evento: any) {
        for (const seguimiento of this.datosPaciente.seguimiento) {
            if (evento.value === this.pipedate.transform(seguimiento.fecha_cita, 'dd-MM-yyyy')){
                this.cargarDatos(seguimiento)
            }
        }
    }

    cargarDatos(seguimiento:any){
        seguimiento=this.datosPaciente
        this.seguimientoForm.controls['observaciones'].setValue(seguimiento.observaciones)
        this.seguimientoForm.controls['anotaciones'].setValue(seguimiento.anotaciones)
        this.seguimientoForm.controls['conducta_a_seguir'].setValue(seguimiento.conducta_a_seguir)
        this.seguimientoForm.controls['fecha_prox_cita'].setValue(seguimiento.fecha_prox_cita)
        this.seguimientoForm.controls['hora_prox_cita'].setValue(seguimiento.hora_prox_cita)
        this.seguimientoForm.controls['fin_prox_cita'].setValue(seguimiento.fin_prox_cita)
    }
}
