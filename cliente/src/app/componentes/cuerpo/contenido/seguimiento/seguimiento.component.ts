import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import { DataShareService } from 'src/app/servicios/data-share.service';

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
    constructor(private fb: FormBuilder, 
        private dsDatos: DataShareService,
        private serv: BbddService) {
    }

    ngOnInit(): void {
        this.cargarPantalla();
    }


    suscripcion: any
    datos: any

    cargarPantalla() {

        this.suscripcion = this.dsDatos._valoracion$.subscribe({
            next: _valoracion => {
                this.serv.getDatosMedicosPaciente(localStorage.getItem('idPaciente')).subscribe(
                    {
                        next: value => {
                            this.seguimientoForm.controls['procedencia'].setValue(value.datosMedicos.valoracion[_valoracion].procedencia)
                            this.seguimientoForm.controls['fecha_diagnostico'].setValue(String(value.datosMedicos.valoracion[_valoracion].diagnostico_medico.fecha_diagnostico).split('T')[0])
                            this.seguimientoForm.controls['con_motivo'].setValue(value.datosMedicos.valoracion[_valoracion].motivo_consulta)
                            this.seguimientoForm.controls['con_sintomas'].setValue(value.datosMedicos.valoracion[_valoracion].sintomas)
                           
                        }
                    }
                )
            }
        })
    }
    seguimientoForm = this.fb.group({
        observaciones_cita: [''],
        observaciones_propias: [''],
        conducta_a_seguir: [''],
        fecha_p_cita: [''],
        inicio_p_cita: [''],
        fin_p_cita: ['']
    })

    onSubmit() {
        const datos = {
            observaciones_cita: this.seguimientoForm.controls['observaciones_cita'].value,
            observaciones_propias: this.seguimientoForm.controls['observaciones_propias'].value,
            conducta_a_seguir: this.seguimientoForm.controls['conducta_a_seguir'].value,
            fecha_p_cita: this.seguimientoForm.controls['fecha_p_cita'].value,
            inicio_p_cita: this.seguimientoForm.controls['inicio_p_cita'].value,
            fin_p_cita: this.seguimientoForm.controls['fin_p_cita'].value

        }
    }


}
