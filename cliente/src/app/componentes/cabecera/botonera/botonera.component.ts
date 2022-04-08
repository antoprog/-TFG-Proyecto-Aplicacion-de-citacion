import {Component} from '@angular/core';
import {NavbarClientesService} from "../../../servicios/navbar-clientes.service";

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})
export class BotoneraComponent {
  constructor(private servicio: NavbarClientesService) {
  }

  nombreCliente = "";
  nombres: any = [];

  buscarCliente() {
    if (this.nombreCliente != '' && this.nombreCliente.length > 2) {
      this.servicio.getDatos(this.nombreCliente).subscribe(nombre => {
        this.nombres = [];
        nombre.forEach((element: any) => {
          this.nombres.push(element.name);
        });
      })
    } else {
      this.nombres = [];
    }
  }
}
