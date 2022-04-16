import { Component, OnInit } from '@angular/core';
import { Psicologo } from 'src/app/modelo/psicologo';
import {BbddService} from "../../../../servicios/bbdd.service";
@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  
 
  constructor(private servicio:BbddService) { 
   
  }
 psico:any
  ngOnInit(): void {
    this.servicio.getDatosPsicoligo("psicologoUno").subscribe(
      result => this.psico=result
    )  
  }
  
}
