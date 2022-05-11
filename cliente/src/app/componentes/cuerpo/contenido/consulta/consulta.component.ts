import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import * as moment from 'moment';
import {DataShareService} from "../../../../servicios/data-share.service";
import {ToastrService} from "ngx-toastr";

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
                private bbdd: BbddService,private toastr: ToastrService,
                private dataShare: DataShareService) {
    }

    ngOnDestroy(): void {
        this.sus1.unsubscribe();
        this.sus2.unsubscribe();
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

    sus1: any
    sus2: any
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
        this.sus2 = this.dataShare.paciente$.subscribe(
            {
                next: value => {
                    if (value) {
                        const ruta = value.datosMedicos?.valoracion[parseInt(localStorage.getItem('valoracionId')!)]
                        this.consultaForm.controls['psicologo'].setValue(ruta.psicologo)
                        this.consultaForm.controls['procedencia'].setValue(ruta?.procedencia)
                        this.consultaForm.controls['fecha_diagnostico'].setValue(String(ruta!.diagnostico_medico?.fecha_diagnostico).split('T')[0])
                        this.consultaForm.controls['con_motivo'].setValue(ruta!.motivo_consulta)
                        this.consultaForm.controls['con_sintomas'].setValue(ruta!.sintomas)
                        this.consultaForm.controls['posologia'].setValue(ruta!.diagnostico_medico?.posologia)
                        this.consultaForm.controls['patologia_medica'].setValue(ruta!.diagnostico_medico?.patologia_medica)
                    }
                }
            }
        )
    }

    guardar() {
        this.consultaForm.value.fecha_inicio = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.bbdd.altaConsultaPaciente(this.consultaForm.value).subscribe({
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
        this.bbdd.modificarConsultaPaciente(this.consultaForm.value, localStorage.getItem('valoracionId')).subscribe({
            next: value => {
                this.toastr.success('','Modificación realizada correctamente')
            },
            error: err => {
                this.toastr.error('Modificación no realizada', '[ERROR SERVIDOR]: ' + err.status)
            }
        })
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
