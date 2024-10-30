import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    // verifica si el usuario puede activar una ruta
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.isAuthenticated.pipe(take(1));
        // take(1): Toma el primer valor que emite el observable isAuthenticated y luego completa
        //     Esto asegura que solo observamos el estado de autenticación una vez y luego nos desconectamos del observable

        // resumen: deja acceder a las rutas cuando el usuario está autenticado

    }
}

// ENFOQUE FUNCIONAL
// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../services/user.service'; // Servicio de autenticación

// export const authGuard: CanActivateFn = (route, state) => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//   return userService.isAuthenticated.pipe(
//     take(1),
//     map((isAuthenticated: boolean) => {
//       if (isAuthenticated) {
//         return true; // Si está autenticado, permite el acceso
//       } else {
//         router.navigate(['/login']); // Redirige al login si no está autenticado
//         return false; // Bloquea el acceso
//       }
//     })
//   );
// };
