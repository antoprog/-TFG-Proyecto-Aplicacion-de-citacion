import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {DataShareService} from "../../../../servicios/data-share.service";

@Component({
    selector: 'app-pruebas',
    templateUrl: './pruebas.component.html',
    styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
// this.formulario.controls['dco_psicologico'].setValue(value.datosMedicos.valoracion[_valoracion].diagnostico_psicologico.diagnostico)
// this.formulario.controls['prueba1'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.cognitiva)
// this.formulario.controls['prueba2'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.emocional)
// this.formulario.controls['prueba3'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.pruebasPsicodiagnostico)


    constructor(private fb: FormBuilder) {
    }

    formulario = this.fb.group({
        dco_psicologico: [''],
        prueba1: [''],
        prueba2: [''],
        prueba3: ['']
    })

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
        const datos = {
            dco_psicologico: this.formulario.controls['dco_psicologico'].value,
            prueba1: this.formulario.controls['prueba1'].value,
            prueba2: this.formulario.controls['prueba2'].value,
            prueba3: this.formulario.controls['prueba3'].value,
        }

    }
}
