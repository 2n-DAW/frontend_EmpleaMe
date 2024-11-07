import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    // verifica si el usuario puede activar una ruta
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.currentUserType.pipe(
            take(1),  // Toma el primer valor emitido
            map(userType => {
                if (userType === 'company') {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}