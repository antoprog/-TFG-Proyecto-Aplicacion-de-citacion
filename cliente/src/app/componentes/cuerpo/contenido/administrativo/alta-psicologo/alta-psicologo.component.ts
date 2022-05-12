import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import {BbddService} from "../../../../../servicios/bbdd.service";
import {AuthService} from "../../../../../servicios/auth.service";
import {ToastrService} from "ngx-toastr";
import { ActivatedRoute } from '@angular/router';
import {Psicologo} from 'src/app/modelo/psicologo';

export interface listaPsicologos {
    _nombre: String
    _valor: String
}

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

    constructor(private fb: FormBuilder,
                private serv: BbddService,
                private service: AuthService,
                private toastr: ToastrService,
                private route: ActivatedRoute) {
    }
    t_psicologo: listaPsicologos[] = [];
    tipo:any;
    _psicologo: Psicologo | undefined;

    ngOnInit(): void {
        this.route.queryParams
            .subscribe((params)=>{
                console.log("parametro",params)
                this.tipo=params["tipo"];
                this.resertearFormulario()
            })

    }

    psicologoForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],//agregar ñ y acentos
        apellido1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        apellido2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*')]],
        tipo_doc: ['DNI', [Validators.required]],
        documentoDni: ['', [Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
        documentoNie: ['', [Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
        titulacion: ['', [Validators.required]],
        especialidad: [''],
        credenciales_adic: [''],
        num_colegiado: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
        telefono: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
        email: ['', [Validators.required, Validators.email]],
        calle: ['', [Validators.required]],
        cod_postal: ['', [Validators.required, Validators.pattern('((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}')]],
        ciudad: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        pais: ['España'],
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    })

    devolverDoc() {
        if (this.psicologoForm.controls['documentoDni'].value !== '') {
            return this.psicologoForm.controls['documentoDni'].value;
        } else {
            return this.psicologoForm.controls['documentoNie'].value
        }
    }
    recuperardoc(){
        if (this.psicologoForm.controls['tipo_doc'].value == 'DNI') {
            this.psicologoForm.controls['documentoDni'].setValue(this._psicologo!.documento);
        } else {
            this.psicologoForm.controls['documentoNie'].setValue(this._psicologo!.documento);
        }
    }

    //funcion de envio
    onSubmit() {
        if(this.tipo=="alta"){
            this.altaPsicologo();
        }else{
            this.modificarPsicologo();
        }

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
    /**
     * Da de alta un psicologo en BBDD
     */
    altaPsicologo(){
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

        console.log(datos);

        if (this.psicologoForm.valid) {
            this.service.signup(login).subscribe({
                next: value => {
                    this.serv.altaPsicologo(datos).subscribe();
                    this.toastr.success('',"Psicólogo creado correctamente.")
                },
                error: err => {
                    console.log(err);
                    this.toastr.error('Error', "Error en servidor. Código: "+err.status)
                }
            });
        }
    }

    modificarPsicologo(){
        const datos = {
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
        this.serv.modificarPsicologoById(datos, this._psicologo!._id,).subscribe({
            next: value => {
                this.toastr.success('','Modificación realizada correctamente')
            },
            error: err => {
                this.toastr.error('Modificación no realizada', '[ERROR SERVIDOR]: ' + err.status)
            }
        })
    }

    /**
     * Carga la lista de psicologos
     */
    cargarPsicologos() {
        this.t_psicologo = [];
        this.t_psicologo[0]={
            _nombre:'',
            _valor:''
        }
        this.serv.getPsicologos().subscribe({
            next: valor => {
                for (const iterator of valor) {
                    let registro: listaPsicologos = {
                        _nombre: iterator.nombre + " " + iterator.apellido1 + " " + iterator.apellido2,
                        _valor: iterator.username
                    }
                    this.t_psicologo.push(registro)
                }
            }
        })
    }
    /**
     * Recupera los datos del psicologo seleccionado y los muestra por pantalla
     * @param username
     */
    obtenerDatosPsicologo(username: any) {
        this.resertearFormulario();
        this.serv.getPsicologoByUser(username.value).subscribe({
            next: dato => {
                this._psicologo = dato;
                console.log("psicologo",this._psicologo);
                this.psicologoForm.controls['nombre'].setValue(this._psicologo.nombre)
                this.psicologoForm.controls['apellido1'].setValue(this._psicologo.apellido1)
                this.psicologoForm.controls['apellido2'].setValue(this._psicologo.apellido2)
                this.psicologoForm.controls['tipo_doc'].setValue(this._psicologo.tipo_doc)
                this.psicologoForm.controls['titulacion'].setValue(this._psicologo.titulacion)
                this.psicologoForm.controls['especialidad'].setValue(this._psicologo.especialidad)
                this.psicologoForm.controls['credenciales_adic'].setValue(this._psicologo.credenciales_adic)
                this.psicologoForm.controls['num_colegiado'].setValue(this._psicologo.num_colegiado)
                this.psicologoForm.controls['telefono'].setValue(this._psicologo.telefono)
                this.psicologoForm.controls['email'].setValue(this._psicologo.email)
                this.psicologoForm.controls['calle'].setValue(this._psicologo.direccion.calle)
                this.psicologoForm.controls['cod_postal'].setValue(this._psicologo.direccion.cod_postal)
                this.psicologoForm.controls['ciudad'].setValue(this._psicologo.direccion.ciudad)
                this.psicologoForm.controls['provincia'].setValue(this._psicologo.direccion.provincia)
                this.psicologoForm.controls['pais'].setValue(this._psicologo.direccion.pais)
                this.recuperardoc()
            }
        })
    }
    resertearFormulario(){
        this.psicologoForm.reset()
        if(this.tipo=="modificar"){
            this.cargarPsicologos();
        }
    }
}
