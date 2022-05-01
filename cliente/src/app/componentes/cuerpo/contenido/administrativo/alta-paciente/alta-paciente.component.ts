import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import {BbddService} from "../../../../../servicios/bbdd.service";
import {ToastrService} from "ngx-toastr";

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

    // t_psicologo = [
    //     {nombre: "Juan Perez"},
    //     {nombre: "Monica Quinteiro"}
    // ];

    //constructor
    constructor(private fb: FormBuilder, private serv: BbddService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    insClienteForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],//agregar ñ y acentos
        apellido1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellido2: ['', [Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        tipo_doc: ['DNI', [Validators.required]],
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
        aseguradora: ['', [Validators.required]],
        company: [''],
        nombreContacto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
        telefonoContacto: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
        permisoGrabacion: [false],
        firmaProteccionDatos: [false, [Validators.requiredTrue]],
        numero_historia: ''
        // psicologo: ['', [Validators.required]]
    })

    devolverDoc() {
        if (this.insClienteForm.controls['documentoDni'].value === '') {
            return this.insClienteForm.controls['documentoNie'].value;
        } else {
            return this.insClienteForm.controls['documentoDni'].value
        }
    }

    aseguradora_err: string = ""
    firma: string = ""

    //funcion de envio
    onSubmit() {
        if (this.insClienteForm.invalid) {
            if (this.insClienteForm.controls['aseguradora'].value == "") {
                this.aseguradora_err = "requerido"
            }else{
                this.aseguradora_err = ""
            }
            if (this.insClienteForm.controls['firmaProteccionDatos'].value == false) {
                this.firma = "Es necesario que se haya entregado el documento"
            }else{
                this.firma = ''
            }
            return
        }

        this.insClienteForm.value.documento = this.devolverDoc()
        this.insClienteForm.value.nomApe1Ape2 = this.insClienteForm.value.nombre + ' ' +
            this.insClienteForm.value.apellido1 + ' ' + this.insClienteForm.value.apellido2

        this.serv.altaPaciente(this.insClienteForm.value).subscribe({
            next: value => {
                this.toastr.success('Alta realizada correctamente')
            },
            error: err => {
                this.toastr.error('Alta no realizada', '[ERROR SERVIDOR]: ' + err.status)
            }
        })

        this.insClienteForm.reset()
        this.insClienteForm.controls['tipo_doc'].setValue('DNI')
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
        if (this.insClienteForm.controls[field].hasError('requiredTrue')) {
            return 'Es necesario que se haya entregado el documento'
        }
        return 'invalid'
    }
}
