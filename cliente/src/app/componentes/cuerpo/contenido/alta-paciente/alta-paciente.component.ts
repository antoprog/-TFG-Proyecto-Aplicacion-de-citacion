import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
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
  t_psicologo=[
    {nombre:"Juan Perez"},
    {nombre:"Monica Quinteiro"}
  ]; 
  //constructor
  constructor(private fb: FormBuilder, private serv: BbddService) {
  }

  ngOnInit(): void {

  }

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
    calle: ['', [Validators.required]],
    cod_postal: ['', [Validators.required, Validators.pattern('((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}')]],
    ciudad: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    pais: ['España'],
    aseguradora: [[Validators.required]],
    company: [''],
    nombreContacto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    telefonoContacto: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    permisoGrabacion: [false],
    firmaProteccionDatos: [false, [Validators.required]],
    psicologo:['',[Validators.required]]
  })

  devolverDoc(){
    if (this.insClienteForm.controls['documento'].value !== ''){
      return this.insClienteForm.controls['nombre'].value;
    }else{
      return this.insClienteForm.controls['apellido1'].value
    }
  }

  //funcion de envio
  onSubmit() {
    const datos = {
      nombre: this.insClienteForm.controls['nombre'].value,
      apellido1: this.insClienteForm.controls['apellido1'].value,
      apellido2: this.insClienteForm.controls['apellido2'].value,
      tipo_doc: this.insClienteForm.controls['tipo_doc'].value,
      documento: this.devolverDoc(),
      fecha_nacimiento:this.insClienteForm.controls['fecha_nacimiento'].value,
      telefono:this.insClienteForm.controls['telefono'].value,
      email:this.insClienteForm.controls['email'].value,
      direccion: {
        calle: this.insClienteForm.controls['calle'].value,
        cod_postal: this.insClienteForm.controls['cod_postal'].value,
        ciudad: this.insClienteForm.controls['ciudad'].value,
        provincia: this.insClienteForm.controls['provincia'].value,
        pais: this.insClienteForm.controls['pais'].value,
      },
      aseguradora:this.insClienteForm.controls['aseguradora'].value,
      company:this.insClienteForm.controls['company'].value,
      contacto:{
        nombre: this.insClienteForm.controls['nombreContacto'].value,
        telefono:this.insClienteForm.controls['telefonoContacto'].value,
      },
      permisoGrabacion:this.insClienteForm.controls['permisoGrabacion'].value,
      firmaProteccionDatos:this.insClienteForm.controls['firmaProteccionDatos'].value,
      datosMedicos: {
        valoracion: [{
          psicologo: this.insClienteForm.controls['psicologo'].value,
        }]
      }
    };
    this.serv.guardar(datos).subscribe({
      next: value => {
        console.log(value);
      },
    
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

