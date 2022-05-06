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
// this.seguimientoForm.controls['procedencia'].setValue(value.datosMedicos.valoracion[_valoracion].procedencia)
// this.seguimientoForm.controls['fecha_diagnostico'].setValue(String(value.datosMedicos.valoracion[_valoracion].diagnostico_medico.fecha_diagnostico).split('T')[0])
// this.seguimientoForm.controls['con_motivo'].setValue(value.datosMedicos.valoracion[_valoracion].motivo_consulta)
// this.seguimientoForm.controls['con_sintomas'].setValue(value.datosMedicos.valoracion[_valoracion].sintomas)

constructor(private fb: FormBuilder,
    private bbdd: BbddService,
    private dataShare: DataShareService) { 

    }
    
    sus2: any
    ngOnInit(): void {
        this.cargarPantalla();
    }

    ngOnDestroy(): void {
        this.sus2.unsubscribe();
    }

    datos: any

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
                    this.seguimientoForm.controls['observaciones_cita'].setValue(ruta?.seguimiento.observaciones)
                    this.seguimientoForm.controls['observaciones_propias'].setValue(ruta?.seguimiento.anotaciones)
                    this.seguimientoForm.controls['conducta_a_seguir'].setValue(ruta?.seguimiento.conducta_a_seguir)
                    this.seguimientoForm.controls['fecha_p_cita'].setValue(ruta?.seguimiento.fecha_prox_cita)
                    this.seguimientoForm.controls['inicio_p_cita'].setValue(ruta?.seguimiento.hora_inicio_cita)
                    this.seguimientoForm.controls['fin_p_cita'].setValue(ruta?.seguimiento.hora_fin_cita)

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

}
