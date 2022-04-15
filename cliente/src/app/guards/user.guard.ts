import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../servicios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
    constructor(private authService:AuthService,
                private router:Router) {}


    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

}
