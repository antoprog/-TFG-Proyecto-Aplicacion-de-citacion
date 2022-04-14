import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AltaPacienteComponent} from './componentes/cuerpo/contenido/administrativo/alta-paciente/alta-paciente.component';
import {MenuConsultaComponent} from "./componentes/cuerpo/menu/menu-consulta.component";
import {AntecedentesComponent} from "./componentes/cuerpo/contenido/antecedentes/antecedentes.component";
import {InformesComponent} from "./componentes/cuerpo/contenido/informes/informes.component";

const routes: Routes = [
  {
    path: "altaPaciente",
    component: AltaPacienteComponent
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
