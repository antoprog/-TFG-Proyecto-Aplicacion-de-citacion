import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';

@Component({
    selector: 'app-pruebas',
    templateUrl: './pruebas.component.html',
    styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

    constructor(private fb: FormBuilder, private serv: BbddService) {
    }

    formulario = this.fb.group({
        dco_psicologico: [''],
        prueba1: [''],
        prueba2: [''],
        prueba3: ['']
    })

    ngOnInit(): void {
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
