import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-inicio-pagina',
  templateUrl: './cabecera-noUsuarios.html',
  styleUrls: ['./cabecera-noUsuarios.css']
})
export class InicioPaginaComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('inicio-pagina');
  }

  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
