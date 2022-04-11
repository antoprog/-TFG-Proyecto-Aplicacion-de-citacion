import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotoneraComponent } from './componentes/cabecera/botonera/botonera.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PieComponent } from './componentes/pie/pie.component';
import { MenuConsultaComponent } from './componentes/cuerpo/menu/menu-consulta/menu-consulta.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    BotoneraComponent,
    PieComponent,
    MenuConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
