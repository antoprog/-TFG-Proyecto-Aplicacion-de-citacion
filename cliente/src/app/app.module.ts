import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {CabeceraComponent} from "./componentes/cabeceras/cabecera-usuarios/cabecera.component";
import {PieComponent} from "./componentes/pie/pie.component";
import {MenuConsultaComponent} from "./componentes/cuerpo/menu/menu-consulta.component";
import {MenuPacienteComponent} from "./componentes/cuerpo/contenido/cabecera/menu-paciente.component";
import {AntecedentesComponent} from "./componentes/cuerpo/contenido/antecedentes/antecedentes.component";
import {PruebasComponent} from "./componentes/cuerpo/contenido/pruebas/pruebas.component";
import {InformesComponent} from "./componentes/cuerpo/contenido/informes/informes.component";
import {AltaPacienteComponent} from "./componentes/cuerpo/contenido/administrativo/alta-paciente/alta-paciente.component";
import {AltaPsicologoComponent} from './componentes/cuerpo/contenido/administrativo/alta-psicologo/alta-psicologo.component';
import {ConsultaComponent} from "./componentes/cuerpo/contenido/consulta/consulta.component";
import {SeguimientoComponent} from "./componentes/cuerpo/contenido/seguimiento/seguimiento.component";
import {AdminGuard} from "./guards/admin.guard";
import {UserGuard} from "./guards/user.guard";
import {TokenInterceptorService} from "./servicios/token-interceptor.service";
import {SignupComponent} from "./componentes/login/signup/signup.component";
import {SigninComponent} from "./componentes/login/signin/signin.component";
import {DatosComponent} from './componentes/cuerpo/contenido/datos/datos.component';
import {InicioPaginaComponent} from './componentes/pagina-inicio/pagina-inicio';
import {MisDatosComponent} from './componentes/cuerpo/contenido/mis-datos/mis-datos.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CambiarPassComponent} from './componentes/cuerpo/contenido/administrativo/cambiar-pass/cambiar-pass.component';
import {ToastrModule} from "ngx-toastr";
import { CabeceraNoUserComponent } from './componentes/cabeceras/cabecera-no-user/cabecera-no-user.component';

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
        AltaPsicologoComponent,
        SeguimientoComponent,
        SignupComponent,
        SigninComponent,
        DatosComponent,
        InicioPaginaComponent,
        MisDatosComponent,
        CambiarPassComponent,
        CabeceraNoUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(), // ToastrModule added
    ],
    providers: [
        AdminGuard,
        UserGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
