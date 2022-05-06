import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {DataShareService} from "../../../../servicios/data-share.service";

@Component({
    selector: 'app-pruebas',
    templateUrl: './pruebas.component.html',
    styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit, OnDestroy {
// this.formulario.controls['dco_psicologico'].setValue(value.datosMedicos.valoracion[_valoracion].diagnostico_psicologico.diagnostico)
// this.formulario.controls['prueba1'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.cognitiva)
// this.formulario.controls['prueba2'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.emocional)
// this.formulario.controls['prueba3'].setValue(value.datosMedicos.valoracion[_valoracion].test_diagnosticos.pruebasPsicodiagnostico)


    constructor(private fb: FormBuilder,
                private bbdd: BbddService,
                private dataShare: DataShareService) {
    }

    pruebasForm = this.fb.group({
        dco_psicologico: [''],
        prueba1: [''],
        prueba2: [''],
        prueba3: ['']
    })

    sus2: any

    ngOnInit(): void {
        this.cargarPantalla();
    }

    ngOnDestroy(): void {
        this.sus2.unsubscribe();
    }
    
cargarPantalla() {
    this.sus2 = this.dataShare.paciente$.subscribe(
        {
            next: value => {
                if (value) {
                  const ruta = value.datosMedicos?.valoracion[parseInt(localStorage.getItem('valoracionId')!)]
                    this.pruebasForm.controls['dco_psicologico'].setValue(ruta?.diagnostico_psicologico.diagnostico)
                    this.pruebasForm.controls['prueba1'].setValue(ruta?.test_diagnosticos.cognitiva)
                    this.pruebasForm.controls['prueba2'].setValue(ruta?.test_diagnosticos.emocional)
                    this.pruebasForm.controls['prueba3'].setValue(ruta?.test_diagnosticos.pruebasPsicodiagnostico)
                    
                }
            }
        }
    )
  }

  guardar() {
    this.pruebasForm.value.fecha_valoracion= moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');

    setTimeout(() => {
        this.dataShare._idPaciente$.next(String(localStorage.getItem('idPaciente')))
    }, 1500)
}

modificar() {
    this.bbdd.modificarPruebas(this.pruebasForm.value).subscribe()
}


   
}
