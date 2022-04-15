import {Component, OnInit} from '@angular/core';
import {NavbarClientesService} from "../../servicios/navbar-clientes.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{
  constructor(private servicio: NavbarClientesService) {
  }

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

  ngOnInit(): void {

  }

}
