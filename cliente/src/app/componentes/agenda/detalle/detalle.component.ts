import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
    @Input() public evento: any;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        let d1 = this.elementRef.nativeElement.querySelector('.one');
        d1.insertAdjacentHTML('beforeend',
            `
            ${this.evento.actions[0].a11yLabel}
            ${this.evento.actions[0].label}
            <button (click)="${this.evento.actions[0].label}
            `);
    }

    ngOnInit(): void {
    }

}
