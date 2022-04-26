import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BbddService} from 'src/app/servicios/bbdd.service';

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
    constructor(private fb: FormBuilder, private serv: BbddService) {
    }

    ngOnInit(): void {
    }

    t_psicologo = [
        {nombre: "Juan Perez"},
        {nombre: "Monica Quinteiro"}
    ];

    formulario = this.fb.group({
        observaciones_cita: [''],
        observaciones_propias: [''],
        conducta_a_seguir: [''],
        fecha_p_cita: [''],
        inicio_p_cita: [''],
        fin_p_cita: ['']
    })

    onSubmit() {
        const datos = {
            observaciones_cita: this.formulario.controls['observaciones_cita'].value,
            observaciones_propias: this.formulario.controls['observaciones_propias'].value,
            conducta_a_seguir: this.formulario.controls['conducta_a_seguir'].value,
            fecha_p_cita: this.formulario.controls['fecha_p_cita'].value,
            inicio_p_cita: this.formulario.controls['inicio_p_cita'].value,
            fin_p_cita: this.formulario.controls['fin_p_cita'].value

        }
    }


}
