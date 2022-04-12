import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-paciente',
  templateUrl: './menu-paciente.component.html',
  styleUrls: ['./menu-paciente.component.css']
})
export class MenuPacienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data= {nombre: 'antonio', apellido1: 'pastor', apellido2: 'aranda', edad: 30 }

}
