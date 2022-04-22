import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BbddService } from 'src/app/servicios/bbdd.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  constructor( private fb:FormBuilder, private serv: BbddService) { }
  consultaForm = this.fb.group({
    procedencia: [''],
    con_motivo: [''],
    con_sintomas: [''],
    fecha_diagnostico: [''],
    patología_medica: [''],
    dco_medico1: [''],
    dco_medico2: ['']
  })
  ngOnInit(): void {
  }
  onSubmit(){
    const datos= {
      procedencia: this.consultaForm.controls['procedencia'].value ,
      con_motivo: this.consultaForm.controls['con_motivo'].value,
      con_sintomas:this.consultaForm.controls['con_sintomas'].value ,
      fecha_diagnostico: this.consultaForm.controls['fecha_diagnostico'].value,
      patología_medica: this.consultaForm.controls['patología_medica'].value,
      dco_medico1: this.consultaForm.controls['dco_medico1'].value,
      dco_medico2: this.consultaForm.controls['dco_medico2'].value
    }
  }
  // control de errores
  getError(field: string): string {
    if (!this.consultaForm.controls[field].dirty || !this.consultaForm.controls[field].errors) {
      return ''
    }
    if (this.consultaForm.controls[field].hasError('required')) {
      return 'required'
    }
    if (this.consultaForm.controls[field].hasError('minlength')) {
      return `The min length is ${this.consultaForm.controls[field].getError('minlength')['requiredLength']}`
    }
    if (this.consultaForm.controls[field].hasError('min')) {
      return `The min ${this.consultaForm.controls[field].getError('min')['min']}`
    }
    if (this.consultaForm.controls[field].hasError('max')) {
      return `The max ${this.consultaForm.controls[field].getError('max')['max']}`
    }
    if (this.consultaForm.controls[field].hasError('pattern')) {
      return 'Formato de documento no valido'
    }
    return 'invalid'
  }

  

}
