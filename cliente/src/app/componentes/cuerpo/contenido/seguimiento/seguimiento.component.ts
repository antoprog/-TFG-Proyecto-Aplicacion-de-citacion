import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {DataShareService} from 'src/app/servicios/data-share.service';
import {DatePipe} from "@angular/common";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";


@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
    constructor(private fb: FormBuilder,
                private bbdd: BbddService,
                private toastr: ToastrService,
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
    fechaCita: any

    seguimientoForm = this.fb.group({
        observaciones: [''],
        anotaciones: [''],
        conducta_a_seguir: [''],
        fecha_prox_cita: [''],
        fecha_cita: [''],
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
                        this.fechaCita=this.pipedate.transform(ruta?.seguimiento.fecha_cita, 'dd-MM-yyyy');
                        
                       
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
        this.seguimientoForm.value.fecha_cita = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.bbdd.altaSeguimiento(this.seguimientoForm.value, localStorage.getItem('valoracionId')).subscribe({
            next: value => {
                this.toastr.success('','Se ha guardado correctamente')
            },
            error: err => {
                this.toastr.error('Error no se ha guardado', '[ERROR SERVIDOR]: ' + err.status)
            }
        })
        setTimeout(() => {
            this.dataShare._idPaciente$.next(String(localStorage.getItem('idPaciente')))
        }, 1500)
    }

    modificar() {
      
        this.bbdd.modificarSeguimiento(this.seguimientoForm.value, localStorage.getItem('valoracionId')).subscribe({
            next: value => {
                this.toastr.success('','Modificación realizada correctamente')
            },
            error: err => {
                this.toastr.error('Modificación no realizada', '[ERROR SERVIDOR]: ' + err.status)
            }
        })
    }

    cambiarValoracion(evento: any) {
        for (const seguimiento of this.datosPaciente.seguimiento) {
            if (evento.value === this.pipedate.transform(seguimiento.fecha_cita, 'dd-MM-yyyy')){
                this.cargarDatos(seguimiento)
            }
        }
    }
   
    cargarDatos(seguimiento:any){
        
        
        this.seguimientoForm.controls['observaciones'].setValue(seguimiento?.observaciones)
        this.seguimientoForm.controls['anotaciones'].setValue(seguimiento?.anotaciones)
        this.seguimientoForm.controls['conducta_a_seguir'].setValue(seguimiento?.conducta_a_seguir)
        this.seguimientoForm.controls['fecha_prox_cita'].setValue(seguimiento?.fecha_prox_cita)
        this.seguimientoForm.controls['hora_prox_cita'].setValue(seguimiento?.hora_prox_cita)
        this.seguimientoForm.controls['fin_prox_cita'].setValue(seguimiento?.fin_prox_cita)
        this.seguimientoForm.controls['fecha_cita'].setValue(String(seguimiento?.fecha_cita).split('T')[0])
    }
}
