import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    AltaPacienteComponent
} from './componentes/cuerpo/contenido/administrativo/alta-paciente/alta-paciente.component';
import {MenuConsultaComponent} from "./componentes/cuerpo/menu/menu-consulta.component";
import {AntecedentesComponent} from "./componentes/cuerpo/contenido/antecedentes/antecedentes.component";
import {InformesComponent} from "./componentes/cuerpo/contenido/informes/informes.component";
import {
    AltaPsicologoComponent
} from './componentes/cuerpo/contenido/administrativo/alta-psicologo/alta-psicologo.component';
import {ConsultaComponent} from "./componentes/cuerpo/contenido/consulta/consulta.component";
import {PruebasComponent} from "./componentes/cuerpo/contenido/pruebas/pruebas.component";
import {SeguimientoComponent} from "./componentes/cuerpo/contenido/seguimiento/seguimiento.component";
import {SigninComponent} from "./componentes/login/signin/signin.component";
import {SignupComponent} from "./componentes/login/signup/signup.component";
import {DatosComponent} from './componentes/cuerpo/contenido/datos/datos.component';
import {AppComponent} from "./app.component";
import {MisDatosComponent} from './componentes/cuerpo/contenido/mis-datos/mis-datos.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'inicio',
        component: AppComponent
    },
    {
        path: "misDatos",
        component: MisDatosComponent
    },
    {
        path: 'login',
        outlet: 'sinPermiso',
        component: SigninComponent
    },
    {
        path: 'registro',
        outlet: 'sinPermiso',
        component: SignupComponent
    },
    {
        path: "misDatos",
        component: DatosComponent
    },
    {
        path: "altaPaciente",
        component: AltaPacienteComponent
    },
    {
        path: "altaPsicologo",
        component: AltaPsicologoComponent
    },
    {
        path: 'menu',
        component: MenuConsultaComponent,
        children: [
            {
                path: 'antecedentes',
                outlet: 'prueba',
                component: AntecedentesComponent
            },
            {
                path: 'consulta',
                outlet: 'prueba',
                component: ConsultaComponent
            },
            {
                path: 'pruebas',
                outlet: 'prueba',
                component: PruebasComponent
            },
            {
                path: 'seguimiento',
                outlet: 'prueba',
                component: SeguimientoComponent
            },
            {
                path: 'informes',
                outlet: 'prueba',
                component: InformesComponent
            },
            /* {
              path: 'facturas',
              outlet: 'prueba',
              component: AntecedentesComponent
            },
            {
              path: 'videollamada',
              outlet: 'prueba',
              component: AntecedentesComponent
            }, */
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
