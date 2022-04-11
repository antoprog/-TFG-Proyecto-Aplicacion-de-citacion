import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators, FormArray} from "@angular/forms"


@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})

export class AltaPacienteComponent implements OnInit {
  pagina = 0;
  t_doc= [
    {nombre:"DNI"},
    {nombre:"NIE"}
  ];
  t_aseguradora=[
    {tipo:"PIVADO"},
    {tipo:"COMPAÑIA"},
    {tipo:"JUDICIAL"},
  ];
  insClienteForm = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    apellido1:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    apellido2:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    tipo_doc:[[Validators.required]],
    documentoDni:['',[Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    documentoNie:['',[Validators.required, Validators.pattern(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
    fecha_nacimiento:['',[Validators.required]],
    telefono:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
    email:['',[Validators.required,Validators.email]],
    domicilio: new FormArray([],[Validators.required]),
    aseguradora:[[Validators.required]],
    company:['',[Validators.required]]
  }); 
 
  //TODO: Iniciar el formulario hijo 
  initFormDomicilio(): FormGroup {
    return new FormGroup({
      calle: new FormControl('', [Validators.required]),
      cod_postal: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
    });
  }
  //TODO: Agregar nuevo domicilio en form 
  adddomicilio(): void {
    let refDireccion = this.insClienteForm.get('domicilio') as FormArray;
    refDireccion.push(this.initFormDomicilio());
  }
  //TODO: Obtener referencia a un formControl
  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }
  
  //constructor
  constructor(private fb: FormBuilder) { 
    this.adddomicilio()
  }

  //funcion de envio
  onSubmit() {
    console.log(this.insClienteForm.value);
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

  
  ngOnInit(): void {
    this.loadData()
  }
  loadData(): void {
    const data = {
     
      domicilio: [
        {
          calle: '',
          cod_postal: '',
          ciudad: '',
          provincia: '',
          pais: '', 
        },
       
      ],
    };

    //TODO: Primero creamos el esqueleto del formulario vacio y luego lo llenamos!
    for (const _ of data.domicilio) {
      this.adddomicilio();
    }

    //TODO: Puedes comentar la siguiente funcion y se debe armar el numero de skill vacio
    this.insClienteForm.patchValue(data);
  }
  //funcion de paginacion
/**   sumar(){
    if (!this.insClienteForm.invalid){
      this.pagina++;
    }
  }*/
  
  
}

