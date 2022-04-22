import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BbddService } from 'src/app/servicios/bbdd.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(private fb:FormBuilder, private serv: BbddService) { }
informesForm=this.fb.group({
  informe_p:[''],
  informe_j:[''],
  ProteccionDatos:['', Validators.required]
})
onSubmit(){
  const datos= {
    informe_p: this.informesForm.controls['informe_p'].value,
    informe_j: this.informesForm.controls['informe_j'].value,
    ProteccionDatos: this.informesForm.controls['ProteccionDatos'].value
  }
}
  ngOnInit(): void {
  }

  getError(field: string): string {
  
    if (this.informesForm.controls[field].hasError('required')) {
      return 'required'
    }
   
    return 'invalid'
  }

}
