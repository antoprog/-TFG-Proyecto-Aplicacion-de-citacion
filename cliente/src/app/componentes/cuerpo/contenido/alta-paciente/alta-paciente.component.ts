import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from "@angular/forms"
import {BbddService} from "../../../../servicios/bbdd.service";


@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})

export class AltaPacienteComponent implements OnInit {
  t_doc = [
    {nombre: "DNI"},
    {nombre: "NIE"}
  ];
  t_aseguradora = [
    {tipo: "PRIVADO"},
    {tipo: "COMPAÑIA"},
    {tipo: "JUDICIAL"},
  ];

  insClienteForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],//agregar ñ y acentos
    apellido1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    apellido2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    tipo_doc: [[Validators.required]],
    documentoDni: ['', [Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    documentoNie: ['', [Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    fecha_nacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    email: ['', [Validators.required, Validators.email]],
    calle: ['', [Validators.required], Validators.pattern('/^[0-9]{5}$/')],
    cod_postal: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    pais: ['España'],
    aseguradora: [[Validators.required]],
    company: [''],
    nombreContacto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    telefonoContacto: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    permisoGrabacion: [false],
    firmaProteccionDatos: [false, [Validators.required]]
  })

  //constructor
  constructor(private fb: FormBuilder, private serv: BbddService) {
  }

  ngOnInit(): void {

  }

  //funcion de envio
  onSubmit() {
    this.serv.guardar(this.insClienteForm.value).subscribe(res => {
      console.log(res);
    })
  }

  //funcion de control de errores
  getError(field: string): string {
    if (!this.insClienteForm.controls[field].dirty || !this.insClienteForm.controls[field].errors) {
      return ''
    }
    if (this.insClienteForm.controls[field].hasError('required')) {
      return 'required'
    }

    if (this.insClienteForm.controls[field].hasError('minlength')) {
      return `The min length is ${this.insClienteForm.controls[field].getError('minlength')['requiredLength']}`
    }

    if (this.insClienteForm.controls[field].hasError('min')) {
      return `The min ${this.insClienteForm.controls[field].getError('min')['min']}`
    }

    if (this.insClienteForm.controls[field].hasError('max')) {
      return `The max ${this.insClienteForm.controls[field].getError('max')['max']}`
    }
    if (this.insClienteForm.controls[field].hasError('pattern')) {
      console.log("entra")
      return 'Formato de documento no valido'
    }
    return 'invalid'
  }
}

