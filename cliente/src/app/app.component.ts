import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private router: Router) {
    }

    acceso: any

    ngOnInit(): void {
        console.log('app-component');
        this.acceso = !!localStorage.getItem('token');
        this.router.navigate(
            ['.']
        ).then();
    }
}
