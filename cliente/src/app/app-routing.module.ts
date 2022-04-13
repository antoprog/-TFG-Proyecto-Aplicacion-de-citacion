import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaPacienteComponent } from './componentes/cuerpo/contenido/alta-paciente/alta-paciente.component';

const routes: Routes = [
  {
    path:"administracion/altaPaciente",
    component:AltaPacienteComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
