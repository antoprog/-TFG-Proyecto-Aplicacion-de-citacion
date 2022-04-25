import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BbddService} from "../../../../servicios/bbdd.service";
import {Paciente} from "../../../../modelo/paciente";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-paciente',
    templateUrl: './menu-paciente.component.html',
    styleUrls: ['./menu-paciente.component.css']
})
export class MenuPacienteComponent implements OnInit {

    constructor(private servicio: BbddService,
                private cd: ChangeDetectorRef) {
    }

    diagnostico: String[] = []
    data: Paciente | undefined
    edad = 0

    ngOnInit(): void {
        //this.obtenerDiagnosticos()
        this.obtenerDatosPaciente()
        // if (!this.primeraVez){
        //     this.primeraVez = true
        //     let currentUrl = this.router.url;
        //     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //     this.router.onSameUrlNavigation = 'reload';
        //     this.router.navigate([currentUrl]);
        // }
this.cd.detectChanges()
        console.log('carga-menu-paciente');
    }

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    obtenerDatosPaciente() {
        this.servicio.getDatosMedicosPaciente(localStorage.getItem('paciente')).subscribe({
            next: value => {
                this.data = value
                this.edad = this.calcularEdad(this.data?.fecha_nacimiento)
                this.edad = this.edad || 0
            },
            error: err => {
                console.log('MENU-PACIENTE', err);
            },
            complete: () => {
            }
        });
    }

    obtenerDiagnosticos() {
        this.servicio.getDatosMedicosPaciente('fernando').subscribe(
            {
                next: value => {
                    for (let valoracion of value.datosMedicos.valoracion) {
                        this.diagnostico.push(valoracion.diagnostico_psicologico.diagnostico)
                    }
                    this.diagnostico = this.diagnostico.sort(function (a, b) {
                        if (a < b) {
                            return 1;
                        }
                        if (a > b) {
                            return -1;
                        }
                        return 0;
                    })
                }
            }
        )
    }
}
