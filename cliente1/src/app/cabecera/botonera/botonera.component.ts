import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})
export class BotoneraComponent implements OnInit {

  nombreCliente = "Fernando Perez Martinez";
  constructor() { }

  ngOnInit(): void {
  }

}
