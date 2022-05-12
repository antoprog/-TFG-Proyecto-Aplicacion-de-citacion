import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import {ToastrService} from "ngx-toastr";
import {Paciente} from 'src/app/modelo/paciente';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {DataShareService} from 'src/app/servicios/data-share.service';
import {DatePipe} from '@angular/common'

@Component({
    selector: 'app-mod-paciente',
    templateUrl: './mod-paciente.component.html',
    styleUrls: ['./mod-paciente.component.css']
})
export class ModPacienteComponent implements OnInit {
    t_doc = [
        {nombre: "DNI"},
        {nombre: "NIE"}
    ];
    t_aseguradora = [
        {tipo: "PRIVADO"},
        {tipo: "COMPAÑIA"},
        {tipo: "JUDICIAL"},
    ];
    aseguradora_err: string = ""
    firma: string = ""
    _paciente: Paciente | undefined;
    sus2: any
    datoP: any

    constructor(private fb: FormBuilder, private serv: BbddService, private toastr: ToastrService, private dataShare: DataShareService, private datepipe: DatePipe) {
    }

    ngOnInit(): void {
        this.obtenerDatosPaciente();
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
        nombreContacto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        telefonoContacto: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
        permisoGrabacion: [false],
        firmaProteccionDatos: [false, [Validators.requiredTrue]],
        numero_historia: ''
    })

    devolverDoc() {
        if (this.insClienteForm.controls['documentoDni'].value === '') {
            return this.insClienteForm.controls['documentoNie'].value;
        } else {
            return this.insClienteForm.controls['documentoDni'].value;
        }
    }

    recuperardoc() {
        if (this.insClienteForm.controls['tipo_doc'].value == 'DNI') {
            this.insClienteForm.controls['documentoDni'].setValue(this._paciente!.documento);
        } else {
            this.insClienteForm.controls['documentoNie'].setValue(this._paciente!.documento);
        }
    }

    //funcion de envio
    onSubmit() {
        console.log("uno f")
        if (this.insClienteForm.invalid) {
            if (this.insClienteForm.controls['aseguradora'].value == "") {
                this.aseguradora_err = "requerido"
            } else {
                this.aseguradora_err = ""
            }
            if (this.insClienteForm.controls['firmaProteccionDatos'].value == false) {
                this.firma = "Es necesario que se haya entregado el documento"
            } else {
                this.firma = ''
            }
            return
        }

        
        this.modificarPaciente();

        
        this.insClienteForm.reset()
        this.insClienteForm.controls['tipo_doc'].setValue('DNI')
        this.obtenerDatosPaciente();

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

    modificarPaciente() {
        const datos = {
            nomApe1Ape2: this.insClienteForm.value.nombre + ' ' + this.insClienteForm.value.apellido1 + ' ' + this.insClienteForm.value.apellido2,
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
            contacto: {
                nombre: this.insClienteForm.controls['nombreContacto'].value,
                telefono: this.insClienteForm.controls['telefonoContacto'].value,
            },
            permiso_grabacion: this.insClienteForm.controls['permisoGrabacion'].value,
            firma_proteccion_datos: this.insClienteForm.controls['firmaProteccionDatos'].value,
            numero_historia: this.insClienteForm.controls['numero_historia'].value
        }

        
        this.serv.modificarPacienteById(datos, this._paciente!._id).subscribe({
            next: value => {
                this.toastr.success('','Modificación realizada correctamente')
            },
            error: err => {
                this.toastr.error('Modificación no realizada', '[ERROR SERVIDOR]: ' + err.status)
            }
        });
    }

    obtenerDatosPaciente() {
        this.resertearFormulario();
        this.sus2 = this.dataShare.paciente$.subscribe({
            next: datoP => {
                this._paciente = datoP;
                console.log('DATO P',datoP);
                console.log("paciente", this._paciente);
                this.insClienteForm.controls['nombre'].setValue(this._paciente!.nombre)
                this.insClienteForm.controls['apellido1'].setValue(this._paciente!.apellido1)
                this.insClienteForm.controls['apellido2'].setValue(this._paciente!.apellido2)
                this.insClienteForm.controls['tipo_doc'].setValue(this._paciente!.tipo_doc)
                this.insClienteForm.controls['fecha_nacimiento'].setValue(String(this._paciente!.fecha_nacimiento).split('T')[0])
                this.insClienteForm.controls['telefono'].setValue(this._paciente!.telefono)
                this.insClienteForm.controls['email'].setValue(this._paciente!.email)
                this.insClienteForm.controls['calle'].setValue(this._paciente!.direccion?.calle)
                this.insClienteForm.controls['cod_postal'].setValue(this._paciente!.direccion?.cod_postal)
                this.insClienteForm.controls['ciudad'].setValue(this._paciente!.direccion?.ciudad)
                this.insClienteForm.controls['provincia'].setValue(this._paciente!.direccion?.provincia)
                this.insClienteForm.controls['pais'].setValue(this._paciente!.direccion?.pais)
                this.insClienteForm.controls['aseguradora'].setValue(this._paciente!.aseguradora)
                this.insClienteForm.controls['company'].setValue(this._paciente!.company)
                this.insClienteForm.controls['nombreContacto'].setValue(this._paciente!.contacto?.nombre)
                this.insClienteForm.controls['telefonoContacto'].setValue(this._paciente!.contacto?.telefono)
                this.insClienteForm.controls['permisoGrabacion'].setValue(this._paciente!.permiso_grabacion)
                this.insClienteForm.controls['firmaProteccionDatos'].setValue(this._paciente!.firma_proteccion_datos)
                this.insClienteForm.controls['numero_historia'].setValue(this._paciente!.numero_historia)
                this.recuperardoc()


            }
        })
    }

    resertearFormulario() {
        this.insClienteForm.reset();
    }

    ngOnDestroy(): void {
        this.sus2.unsubscribe();
    }
}
