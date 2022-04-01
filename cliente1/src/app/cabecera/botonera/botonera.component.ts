import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../servicios/navbar-clientes.service";

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})
export class BotoneraComponent implements OnInit {

  nombreCliente = "Fernando Perez Martinez";

  constructor(private servicio: NavbarClientesService) {
  }

  ngOnInit(): void {
  }

  listaNombres:string[] = [];

  buscarCliente() {
    this.servicio.getNombreClientes().subscribe(nombre => {
      console.log(nombre.toString())
    })
  }
}
