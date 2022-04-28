import { variable } from '@angular/compiler/src/output/output_ast';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import {BbddService} from "../../../../../servicios/bbdd.service";

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
    t_psicologo = [
        {nombre: "Juan Perez"},
        {nombre: "Monica Quinteiro"}
    ];

    //constructor
    constructor(private fb: FormBuilder, private serv: BbddService) {
    }

    ngOnInit(): void {
    }

    insClienteForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],//agregar ñ y acentos
        apellido1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellido2: ['', [Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        tipo_doc: ['',[Validators.required]],
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
        aseguradora: ['',[Validators.required]],
        company: [''],
        nombreContacto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
        telefonoContacto: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
        permisoGrabacion: [false],
        firmaProteccionDatos: [false,[Validators.requiredTrue]],
        psicologo: ['', [Validators.required]]
    })

    devolverDoc() {
        if (this.insClienteForm.controls['documentoDni'].value === '') {
            return this.insClienteForm.controls['documentoNie'].value;
        } else {
            return this.insClienteForm.controls['documentoDni'].value
        }
    }
    tipo_doc_err:string=""
    psicologo_err:string=""
    aseguradora_err:string=""
    firma:string=""
    //funcion de envio
    onSubmit() {
      
        if(this.insClienteForm.invalid){
            if(this.insClienteForm.controls['tipo_doc'].value==""){
                this.tipo_doc_err = "requerido"
            } 
            if(this.insClienteForm.controls['psicologo'].value==""){
                this.psicologo_err = "requerido"
            } 
            if(this.insClienteForm.controls['aseguradora'].value==""){
                this.aseguradora_err = "requerido"
            } 
            if(this.insClienteForm.controls['firmaProteccionDatos'].value==false){
                this.firma = "Es necesario que se haya entregado el documento"
            } 
            return
        }
        const datos = {
            nomApe1Ape2: this.insClienteForm.controls['nombre'].value + ' ' + this.insClienteForm.controls['apellido1'].value + ' ' + this.insClienteForm.controls['apellido2'].value,
            nombre: this.insClienteForm.controls['nombre'].value,
            apellido1: this.insClienteForm.controls['apellido1'].value,
            apellido2: this.insClienteForm.controls['apellido2'].value,
            tipo_doc: this.insClienteForm.controls['tipo_doc'].value,
            documento: this.devolverDoc(),
            fecha_nacimiento: this.insClienteForm.controls['fecha_nacimiento'].value,
            telefono: this.insClienteForm.controls['telefono'].value,
            email: this.insClienteForm.controls['email'].value,
            direccion: {
                calle: this.insClienteForm.controls['calle'].value,
                cod_postal: this.insClienteForm.controls['cod_postal'].value,
                ciudad: this.insClienteForm.controls['ciudad'].value,
                provincia: this.insClienteForm.controls['provincia'].value,
                pais: this.insClienteForm.controls['pais'].value,
            },
            aseguradora: this.insClienteForm.controls['aseguradora'].value,
            company: this.insClienteForm.controls['company'].value,
            numero_historia: '1234',
            contacto: {
                nombre: this.insClienteForm.controls['nombreContacto'].value,
                telefono: this.insClienteForm.controls['telefonoContacto'].value,
            },
            permiso_grabacion: this.insClienteForm.controls['permisoGrabacion'].value,
            firma_proteccion_datos: this.insClienteForm.controls['firmaProteccionDatos'].value,
        };

        console.log(datos);
        this.serv.altaPaciente(datos).subscribe({
            next: value => {
            },

        })
    }

    //funcion de control de errores
    getError(field: string): string {
        
        if (!this.insClienteForm.controls[field].dirty || !this.insClienteForm.controls[field].errors) {
            return ''
        }
        this.insClienteForm.controls[field].setErrors(Validators.required)
        if (this.insClienteForm.controls[field].hasError('required')) {
            return 'requerido'
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
            return 'Formato de documento no valido'
        }
        if(this.insClienteForm.controls[field].hasError('requiredTrue')){
            return 'Es necesario que se haya entregado el documento'
        }
        return 'invalid'
    }
}

