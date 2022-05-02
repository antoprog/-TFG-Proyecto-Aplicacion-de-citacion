import {Component, OnDestroy} from '@angular/core';
import {DataShareService} from "../../../../servicios/data-share.service";
import {BbddService} from "../../../../servicios/bbdd.service";
import {Paciente} from "../../../../modelo/paciente";

export interface Valoracion {
    ordenI: number,
    diagnosticoI: String,
    fechaInicioI: String,
}

@Component({
    selector: 'app-cabecera-paciente',
    templateUrl: './cabecera-paciente.component.html',
    styleUrls: ['./cabecera-paciente.component.css']
})
export class CabeceraPacienteComponent implements OnDestroy {
    suscription: any;
    _datosPaciente: Paciente | undefined
    valorSelectAnterior: any;

    constructor(private dataShare: DataShareService,
                private baseDatos: BbddService) {

        this.suscription = this.dataShare._idPaciente$.subscribe({
            next: resultado => {
                if (resultado != '') {
                    this.cargarBaseDatos(resultado);
                } else {
                    this.cargarBaseDatos(localStorage.getItem('idPaciente'))
                }
            }
        })

        this.valorSelectAnterior = 0;
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }

    cargarBaseDatos(idPaciente: any) {
        let base = this.baseDatos.getPaciente(idPaciente).subscribe({
            next: resultado => {
                this._datosPaciente = resultado
            },
            complete: () => {
                base.unsubscribe()
            }
        })
    }

    cambiarValoracion(evento: any) {
        this.cargarBaseDatos(localStorage.getItem('idPaciente'))
    }
}
