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
import {MisDatosComponent} from './componentes/cuerpo/contenido/mis-datos/mis-datos.component';
import {InicioPaginaComponent} from "./componentes/pagina-inicio/pagina-inicio";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
    {
        path: '',
        component: InicioPaginaComponent
    },
    {
        path: "misDatos",
        component: MisDatosComponent
    },
    {
        path: 'login',
        component: SigninComponent
    },
    {
        path: 'registro',
        component: SignupComponent
    },
    {
        path: "altaPaciente",
        component: AltaPacienteComponent
    },
    {
        path: "altaPsicologo",
        component: AltaPsicologoComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'psicologo/menu',
        component: MenuConsultaComponent,
        children: [
            {
                path: 'antecedentes',
                outlet: 'psicologo',
                component: AntecedentesComponent
            },
            {
                path: 'consulta',
                outlet: 'psicologo',
                component: ConsultaComponent
            },
            {
                path: 'pruebas',
                outlet: 'psicologo',
                component: PruebasComponent
            },
            {
                path: 'seguimiento',
                outlet: 'psicologo',
                component: SeguimientoComponent
            },
            {
                path: 'informes',
                outlet: 'psicologo',
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
