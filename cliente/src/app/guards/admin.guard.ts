import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {filter, map} from "rxjs";
import {AuthService} from "../servicios/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate() {
        return this.authService.getRoles().pipe(
            filter(member => !!member),  // Filter NULL value here before sending object further
            map(member => {
                console.log(member);
                const index = member.findIndex(rol => rol === "admin");
                    return index != -1;
                }
            ))
    }
}
