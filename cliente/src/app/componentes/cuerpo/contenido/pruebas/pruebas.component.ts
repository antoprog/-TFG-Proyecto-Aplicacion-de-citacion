import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BbddService } from 'src/app/servicios/bbdd.service';
import { DataShareService } from '../../../../servicios/data-share.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-pruebas',
    templateUrl: './pruebas.component.html',
    styleUrls: ['./pruebas.component.css'],
})
export class PruebasComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private bbdd: BbddService,
        private toastr: ToastrService,
        private dataShare: DataShareService
    ) {}

    pruebasForm = this.fb.group({
        dco_psicologico: [''],
        cognitiva: [''],
        emocional: [''],
        pruebasPsicodiagnostico: [''],
    });

    sus2: any;
    dehabilitarBtn:any;

    ngOnInit(): void {
        this.cargarPantalla();
    }

    ngOnDestroy(): void {
        this.sus2.unsubscribe();
    }

    cargarPantalla() {
        this.sus2 = this.dataShare.paciente$.subscribe({
            next: (value) => {
                if (value) {
                    const ruta =
                        value.datosMedicos?.valoracion[
                            parseInt(localStorage.getItem('valoracionId')!)
                        ];
                    this.pruebasForm.controls['dco_psicologico'].setValue(
                        ruta?.diagnostico_psicologico?.diagnostico
                    );
                    this.pruebasForm.controls['cognitiva'].setValue(
                        ruta?.test_diagnosticos?.cognitiva.observaciones
                    );
                    this.pruebasForm.controls['emocional'].setValue(
                        ruta?.test_diagnosticos?.emocional.observaciones
                    );
                    this.pruebasForm.controls[
                        'pruebasPsicodiagnostico'
                    ].setValue(
                        ruta?.test_diagnosticos?.pruebasPsicodiagnostico.observaciones
                    );

                    console.log(
                        'a en cargar pantalla',
                        ruta?.diagnostico_psicologico?.diagnostico
                    );
                    this.dehabilitarBtn=localStorage.getItem('valorCheckAlta')==='true'
                }
            },
            
        });
    }

    modificar() {
        console.log("d", this.pruebasForm.value);
        
        this.bbdd
            .modificarPruebas(
                this.pruebasForm.value,
                localStorage.getItem('valoracionId')
            )
            .subscribe({
                next: value => {
                    this.toastr.success('','Modificación realizada correctamente')
                },
                error: err => {
                    this.toastr.error('Modificación no realizada', '[ERROR SERVIDOR]: ' + err.status)
                }
            });
    }
}
