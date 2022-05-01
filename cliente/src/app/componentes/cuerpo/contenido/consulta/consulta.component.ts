import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import * as moment from 'moment';
import {DataShareService} from "../../../../servicios/data-share.service";

export interface listaPsicologos {
    _nombre: String
    _valor: String
}

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
        psicologo: [''],
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

    t_psicologo: listaPsicologos[] = [];

    cargarPsicologos() {
        this.t_psicologo = [];
        this.bbdd.getPsicologos().subscribe({
            next: valor => {
                for (const iterator of valor) {
                    let registro: listaPsicologos = {
                        _nombre: iterator.nombre + " " + iterator.apellido1 + " " + iterator.apellido2,
                        _valor: iterator.username
                    }
                    this.t_psicologo.push(registro)
                }
            }
        })
    }

    cargarPantalla() {
        this.cargarPsicologos();
        this.suscripcion = this.dataShare._valoracion$.subscribe({
                next: _valoracion => {
                    if (_valoracion) {
                        this.bbdd.getDatosMedicosPaciente(localStorage.getItem('idPaciente')).subscribe(
                            {
                                next: value => {
                                    this.consultaForm.controls['psicologo'].setValue(value.datosMedicos.valoracion[_valoracion].psicologo)
                                    this.consultaForm.controls['procedencia'].setValue(value.datosMedicos.valoracion[_valoracion].procedencia)
                                    this.consultaForm.controls['fecha_diagnostico'].setValue(String(value.datosMedicos.valoracion[_valoracion].diagnostico_medico?.fecha_diagnostico).split('T')[0])
                                    this.consultaForm.controls['con_motivo'].setValue(value.datosMedicos.valoracion[_valoracion].motivo_consulta)
                                    this.consultaForm.controls['con_sintomas'].setValue(value.datosMedicos.valoracion[_valoracion].sintomas)
                                    this.consultaForm.controls['posologia'].setValue(value.datosMedicos.valoracion[_valoracion].diagnostico_medico?.posologia)
                                    this.consultaForm.controls['patologia_medica'].setValue(value.datosMedicos.valoracion[_valoracion].diagnostico_medico?.patologia_medica)
                                }
                            }
                        )
                    }
                }
            }
        )
    }

    guardar() {
        this.consultaForm.value.fecha_inicio = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.bbdd.altaConsultaPaciente(this.consultaForm.value).subscribe()
    }

    modificar() {
        this.bbdd.modificarConsultaPaciente(this.consultaForm.value).subscribe()
    }

// control de errores
    getError(field
                 :
                 string
    ):
        string {
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
