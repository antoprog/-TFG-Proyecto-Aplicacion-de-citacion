import {Component, OnDestroy, OnInit} from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {BbddService} from 'src/app/servicios/bbdd.service';
import {Paciente} from 'src/app/modelo/paciente';
import {DataShareService} from 'src/app/servicios/data-share.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-informe-completo',
    templateUrl: './informe-completo.component.html',
    styleUrls: ['./informe-completo.component.css'],
})
export class InformeCompletoComponent implements OnInit, OnDestroy {
    suscripcion: any
    edad = 0
    _datos: Paciente | undefined
    _valoracion: any
    hoy!: Date

    m_doc = [
        {nombre: 'Revisión medica'},
        {nombre: 'Solicitud del juzgado'},
        {nombre: 'Alta'},
        {nombre: 'Seguimiento'},
        {nombre: 'Petición del paciente'},
    ];

    constructor(
        private servicio: BbddService, private dataShare: DataShareService,
        private datepipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.suscripcion = this.dataShare._idPaciente$.subscribe(value => {
            if (value !== '') {
                this.obtenerDatosPaciente(value)
                this.hoy = new Date();
            } else if (localStorage.getItem('idPaciente')) {
                this.obtenerDatosPaciente(localStorage.getItem('idPaciente'))
                this.hoy = new Date();
            }
        });
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe()
    }

    obtenerDatosPaciente(id: any) {
        this.servicio.getDatosMedicosPaciente(id).subscribe({
            next: value => {
                this._datos = value
                this.edad = this.calcularEdad(this._datos?.fecha_nacimiento)
                this.edad = this.edad || 0
                this._valoracion = value.datosMedicos.valoracion[parseInt(localStorage.getItem('valoracionId')!)]
            },
            error: err => {
                console.log('MENU-PACIENTE', err);
            },
            complete: () => {
            }
        });
    }

    calcularEdad(fxNacimiento: any): number {
        let timeDiff = Math.abs(Date.now() - new Date(fxNacimiento).getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }


    public convertToPDF() {
        let data = document.getElementById('exportar');

        html2canvas(data!).then(canvas => {

            let docWidth = 208;
            let docHeight = canvas.height * docWidth / canvas.width;
            console.log(canvas.height);
            console.log(canvas.width);

            const contentDataURL = canvas.toDataURL('image/png')
            let doc = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)

            doc.save('exportedPdf.pdf');
        });
    }
}

