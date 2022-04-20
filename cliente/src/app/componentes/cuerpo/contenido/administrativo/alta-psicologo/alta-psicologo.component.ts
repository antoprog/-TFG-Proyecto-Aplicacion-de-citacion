import {Component, OnInit} from '@angular/core';
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

  constructor(private fb: FormBuilder, private serv: BbddService) {
  }

  ngOnInit(): void {
  }

  psicologoForm = this.fb.group({
    nombre: ['ASDA', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],//agregar ñ y acentos
    apellido1: ['ASDA', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
    apellido2: ['ASDA', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
    tipo_doc: ['DNI', [Validators.required]],
    documentoDni: ['12312312X', [Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    documentoNie: ['', [Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    titulacion: ['ASD', [Validators.required]],
    especialidad: [''],
    credenciales_adic: [''],
    num_colegiado: ['123123123', [Validators.required, Validators.pattern('[0-9]{9}')]],
    telefono: ['123123123', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    email: ['AS@ASD', [Validators.required, Validators.email]],
    calle: ['ASD', [Validators.required]],
    cod_postal: ['12312', [Validators.required, Validators.pattern('((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}')]],
    ciudad: ['ASD', [Validators.required]],
    provincia: ['ASD', [Validators.required]],
    pais: ['España'],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
  })

  devolverDoc() {
    if (this.psicologoForm.controls['documentoDni'].value !== '') {
      return this.psicologoForm.controls['documentoNie'].value;
    } else {
      return this.psicologoForm.controls['documentoDni'].value
    }
  }

  //funcion de envio
  onSubmit() {
    const datos = {
      username: this.psicologoForm.controls['username'].value,
      nombre: this.psicologoForm.controls['nombre'].value,
      apellido1: this.psicologoForm.controls['apellido1'].value,
      apellido2: this.psicologoForm.controls['apellido2'].value,
      tipo_doc: this.psicologoForm.controls['tipo_doc'].value,
      documento: this.devolverDoc(),
      titulacion: this.psicologoForm.controls['titulacion'].value,
      especialidad: this.psicologoForm.controls['especialidad'].value,
      credenciales_adic: this.psicologoForm.controls['credenciales_adic'].value,
      num_colegiado: this.psicologoForm.controls['num_colegiado'].value,
      telefono: this.psicologoForm.controls['telefono'].value,
      email: this.psicologoForm.controls['email'].value,
      direccion: {
        calle: this.psicologoForm.controls['calle'].value,
        cod_postal: this.psicologoForm.controls['cod_postal'].value,
        ciudad: this.psicologoForm.controls['ciudad'].value,
        provincia: this.psicologoForm.controls['provincia'].value,
        pais: this.psicologoForm.controls['pais'].value,
      },
    };
    const login = {
      email: this.psicologoForm.controls['email'].value,
      username: this.psicologoForm.controls['username'].value,
      password: 'psicologo' + (new Date()).getFullYear(),
      roles: ['psicologo']
    };
    
    this.serv.altaPsicologoLogin(login).subscribe({
      next: value => {
        this.serv.altaPsicologo(datos).subscribe();
      }
    });
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
      return 'Formato de documento no valido'
    }
    return 'invalid'
  }
}
