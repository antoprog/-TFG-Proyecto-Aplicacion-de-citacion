import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import {BbddService} from "../../../../../servicios/bbdd.service";

@Component({
  selector: 'app-alta-psicologo',
  templateUrl: './alta-psicologo.component.html',
  styleUrls: ['./alta-psicologo.component.css']
})
export class AltaPsicologoComponent implements OnInit {
  t_doc = [
    {nombre: "DNI"},
    {nombre: "NIE"}
  ];
  constructor(private fb: FormBuilder, private serv: BbddService) { }

  ngOnInit(): void {}

  psicologoForm= this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],//agregar ñ y acentos
    apellido1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
    apellido2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
    tipo_doc: [[Validators.required]],
    documentoDni: ['', [Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    documentoNie: ['', [Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    titulacion: ['', [Validators.required]],
    especialidad: [''],
    credenciales_adic: [''],
    num_colegiado:['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    telefono: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    email: ['', [Validators.required, Validators.email]],
    calle: ['', [Validators.required]],
    cod_postal: ['', [Validators.required, Validators.pattern('((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}')]],
    ciudad: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    pais: ['España'],
  })

  devolverDoc(){
    if (this.psicologoForm.controls['documentoDni'].value !== ''){
      return this.psicologoForm.controls['documentoNie'].value;
    }else{
      return this.psicologoForm.controls['documentoDni'].value
    }
  }

  //funcion de envio
  onSubmit() {
    const datos = {
      nombre: this.psicologoForm.controls['nombre'].value,
      apellido1: this.psicologoForm.controls['apellido1'].value,
      apellido2: this.psicologoForm.controls['apellido2'].value,
      tipo_doc: this.psicologoForm.controls['tipo_doc'].value,
      documento: this.devolverDoc(),
      titulacion: this.psicologoForm.controls['titulacion'].value,
      especialidad: this.psicologoForm.controls['especialidad'].value,
      credenciales_adic: this.psicologoForm.controls['credenciales_adic'].value,
      num_colegiado:this.psicologoForm.controls['num_colegiado'].value,
      telefono:this.psicologoForm.controls['telefono'].value,
      email:this.psicologoForm.controls['email'].value,
      direccion: {
        calle: this.psicologoForm.controls['calle'].value,
        cod_postal: this.psicologoForm.controls['cod_postal'].value,
        ciudad: this.psicologoForm.controls['ciudad'].value,
        provincia: this.psicologoForm.controls['provincia'].value,
        pais: this.psicologoForm.controls['pais'].value,
      },
    };
    this.serv.altaPsicologo(datos).subscribe({
      next: value => {
        console.log(value);
      },

    })
  }

  //funcion de control de errores
  getError(field: string): string {
    if (!this.psicologoForm.controls[field].dirty || !this.psicologoForm.controls[field].errors) {
      return ''
    }
    if (this.psicologoForm.controls[field].hasError('required')) {
      return 'required'
    }

    if (this.psicologoForm.controls[field].hasError('minlength')) {
      return `The min length is ${this.psicologoForm.controls[field].getError('minlength')['requiredLength']}`
    }

    if (this.psicologoForm.controls[field].hasError('min')) {
      return `The min ${this.psicologoForm.controls[field].getError('min')['min']}`
    }

    if (this.psicologoForm.controls[field].hasError('max')) {
      return `The max ${this.psicologoForm.controls[field].getError('max')['max']}`
    }
    if (this.psicologoForm.controls[field].hasError('pattern')) {
      console.log("entra")
      return 'Formato de documento no valido'
    }
    return 'invalid'
  }
}
