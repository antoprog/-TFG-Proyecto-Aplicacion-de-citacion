import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-inicio-pagina',
  templateUrl: './pagina-inicio.html',
  styleUrls: ['./pagina-inicio.css']
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
