import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataShareService} from "../../../../servicios/data-share.service";
import {BbddService} from 'src/app/servicios/bbdd.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
              private bbdd: BbddService,
              private toastr: ToastrService,
              private dataShare: DataShareService) { 

              }

  ngOnInit(): void {
    this.cargarPantalla();
  }

 
  sus2: any

  ngOnDestroy(): void {
    this.sus2.unsubscribe();
}
  antecedentesForm=this.fb.group({
    ant_familiares:[''],
    ant_personales: ['']

  })



cargarPantalla() {
  this.sus2 = this.dataShare.paciente$.subscribe(
      {
          next: value => {
              if (value) {
                const ruta = value.datosMedicos.antecedentes
                  this.antecedentesForm.controls['ant_familiares'].setValue(ruta?.familiares.observaciones)
                  this.antecedentesForm.controls['ant_personales'].setValue(ruta?.personales.observaciones)
                  
              }
          }
      }
  )
}

guardar() {
  this.bbdd.modificarAntecedentes(this.antecedentesForm.value).subscribe({
      next: value => {
        this.toastr.success('','Se ha guardado correctamente')
    },
    error: err => {
        this.toastr.error('Error no se ha guardado', '[ERROR SERVIDOR]: ' + err.status)
    }
  })

}


}
