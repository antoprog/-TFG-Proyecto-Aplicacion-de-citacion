import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {CabeceraComponent} from "./componentes/cabecera/cabecera.component";
import {PieComponent} from "./componentes/pie/pie.component";
import {MenuConsultaComponent} from "./componentes/cuerpo/menu/menu-consulta.component";
import {MenuPacienteComponent} from "./componentes/cuerpo/contenido/cabecera/menu-paciente.component";
import {AntecedentesComponent} from "./componentes/cuerpo/contenido/antecedentes/antecedentes.component";
import {PruebasComponent} from "./componentes/cuerpo/contenido/pruebas/pruebas.component";
import {InformesComponent} from "./componentes/cuerpo/contenido/informes/informes.component";
import {ConsultaComponent} from "./componentes/cuerpo/contenido/consulta/consulta.component";
import {AltaPacienteComponent} from "./componentes/cuerpo/contenido/administrativo/alta-paciente/alta-paciente.component";
import {AppComponent} from "./app.component";
import { AltaPsicologoComponent } from './componentes/cuerpo/contenido/administrativo/alta-psicologo/alta-psicologo.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
    MenuConsultaComponent,
    MenuPacienteComponent,
    AntecedentesComponent,
    ConsultaComponent,
    PruebasComponent,
    InformesComponent,
    AltaPacienteComponent,
    AltaPsicologoComponent
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
