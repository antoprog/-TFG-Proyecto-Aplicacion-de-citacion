import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    acceso: any
    ngOnInit(): void {
        console.log('app-component');
        this.acceso = !!localStorage.getItem('token');
    }
}
