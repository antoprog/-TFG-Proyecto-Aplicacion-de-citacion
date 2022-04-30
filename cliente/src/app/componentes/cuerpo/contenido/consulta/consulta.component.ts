import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import * as moment from 'moment';
import {DataShareService} from "../../../../servicios/data-share.service";


@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, OnDestroy {
    constructor(private fb: FormBuilder,
                private bbdd: BbddService,
                private dataShare: DataShareService) {
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }

    ngOnInit(): void {
        this.cargarPantalla();
    }

    consultaForm = this.fb.group({
        procedencia: [''],
        con_motivo: [''],
        con_sintomas: [''],
        fecha_diagnostico: [''],
        patologia_medica: [''],
        posologia: [''],
        fecha_inicio: ''
    })

    suscripcion: any
    datos: any

    cargarPantalla() {

        this.suscripcion = this.dataShare._valoracion$.subscribe({
            next: _valoracion => {
                this.bbdd.getDatosMedicosPaciente(localStorage.getItem('idPaciente')).subscribe(
                    {
                        next: value => {
                            this.consultaForm.controls['procedencia'].setValue(value.datosMedicos.valoracion[_valoracion].procedencia)
                            this.consultaForm.controls['fecha_diagnostico'].setValue(String(value.datosMedicos.valoracion[_valoracion].diagnostico_medico.fecha_diagnostico).split('T')[0])
                        }
                    }
                )
            }
        })
    }

    guardar() {
        this.consultaForm.value.fecha_inicio = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.bbdd.altaConsultaPaciente(this.consultaForm.value).subscribe()
    }

    modificar() {
        this.bbdd.modificarConsultaPaciente(this.consultaForm.value).subscribe()
    }

    // control de errores
    getError(field: string): string {
        if (!this.consultaForm.controls[field].dirty || !this.consultaForm.controls[field].errors) {
            return ''
        }
        if (this.consultaForm.controls[field].hasError('required')) {
            return 'required'
        }
        if (this.consultaForm.controls[field].hasError('minlength')) {
            return `The min length is ${this.consultaForm.controls[field].getError('minlength')['requiredLength']}`
        }
        if (this.consultaForm.controls[field].hasError('min')) {
            return `The min ${this.consultaForm.controls[field].getError('min')['min']}`
        }
        if (this.consultaForm.controls[field].hasError('max')) {
            return `The max ${this.consultaForm.controls[field].getError('max')['max']}`
        }
        if (this.consultaForm.controls[field].hasError('pattern')) {
            return 'Formato de documento no valido'
        }
        return 'invalid'
    }


}
