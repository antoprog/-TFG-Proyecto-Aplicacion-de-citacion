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
  data: any;

  buscarCliente(val: any) {
    if (val.length > 2) {
      this.servicio.getDatos(val).subscribe((nombre) => {
        this.data = [];
        nombre.forEach((element: any) => {
          this.data.push(element.name);
        });
      })
    } else {
      this.data = [];
    }
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    this.buscarCliente(val);
  }

  onFocused(e: any) {
    e.target.value = ""
  }

}
