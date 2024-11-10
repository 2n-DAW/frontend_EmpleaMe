import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    // verifica si el usuario puede activar una ruta
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        // take(1): Toma el primer valor que emite el observable isAuthenticated y luego completa
        // Esto asegura que solo observamos el estado de autenticación una vez y luego nos desconectamos del observable
        // map(isAuth => !isAuth): Invierte el valor de isAuth.
        // Deja acceder a las rutas cuando el usuario no está autenticado
    }
}
