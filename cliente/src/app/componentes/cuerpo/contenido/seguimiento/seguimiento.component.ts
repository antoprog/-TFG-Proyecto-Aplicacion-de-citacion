import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  t_psicologo=[
    {nombre:"Juan Perez"},
    {nombre:"Monica Quinteiro"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
