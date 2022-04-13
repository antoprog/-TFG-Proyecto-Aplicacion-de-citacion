import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BbddService} from "../../../../servicios/bbdd.service";

@Component({
  selector: 'app-alta-paciente2',
  templateUrl: './alta-paciente2.component.html',
  styleUrls: ['./alta-paciente2.component.css']
})
export class AltaPaciente2Component implements OnInit {

  constructor(private fb: FormBuilder,
              private servicio:BbddService) {
  }

  ngOnInit(): void {
  }

  miFormulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido1: ['', [Validators.required, Validators.minLength(3)]],
    calle: ['', [Validators.required]],
    cod_postal: ['', [Validators.required, Validators.min(2)]],
    psicologo: ['', [Validators.required, Validators.min(2)]],
    procedencia: ['', [Validators.required, Validators.min(2)]],
  })


  altaCliente() {
    const datos = {
      nombre: this.miFormulario.controls['nombre'].value,
      apellido1: this.miFormulario.controls['apellido1'].value,
      direccion: {
        calle: this.miFormulario.controls['calle'].value,
        cod_postal: this.miFormulario.controls['cod_postal'].value,
      },
      datosMedicos: {
        valoracion: [{
          psicologo: this.miFormulario.controls['psicologo'].value,
          procedencia: this.miFormulario.controls['procedencia'].value
        }]
      }
    };

    this.servicio.guardar(datos).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getError(field: string): string {
    if (!this.miFormulario.controls[field].dirty || !this.miFormulario.controls[field].errors) {
      return ''
    }

    if (this.miFormulario.controls[field].hasError('required')) {
      return 'required'
    }

    if (this.miFormulario.controls[field].hasError('minlength')) {
      return `The min length is ${this.miFormulario.controls[field].getError('minlength')['requiredLength']},
            actual length ${this.miFormulario.controls[field].value.length}`
    }

    if (this.miFormulario.controls[field].hasError('min')) {
      return `The min ${this.miFormulario.controls[field].getError('min')['min']}`
    }

    if (this.miFormulario.controls[field].hasError('max')) {
      return `The max ${this.miFormulario.controls[field].getError('max')['max']}`
    }

    if (this.miFormulario.controls[field].hasError('pattern')) {
      return 'Formato de documento no valido'
    }

    return 'invalid'
  }

}
