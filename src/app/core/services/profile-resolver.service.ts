import { Injectable } from '@angular/core'; // Importa el decorador Injectable de Angular
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'; // Importa clases y tipos necesarios para la resolución de rutas
import { Observable } from 'rxjs'; // Importa la clase Observable de RxJS

import { Profile } from '../models'; // Importa el modelo Profile
import { ProfilesService } from './profiles.service'; // Importa el servicio ProfilesService
import { catchError } from 'rxjs/operators'; // Importa el operador catchError de RxJS

@Injectable({
  providedIn: 'root' // Declara que este servicio está disponible en toda la aplicación
})
export class ProfileResolver implements Resolve<Profile> { // Implementa la interfaz Resolve con el tipo Profile
  constructor(
    private profilesService: ProfilesService, // Inyecta el servicio ProfilesService
    private router: Router // Inyecta el servicio Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot, // Recibe la instantánea de la ruta activada
    state: RouterStateSnapshot // Recibe el estado de la instantánea del router
  ): Observable<any> { // Retorna un Observable de cualquier tipo

    const res = this.profilesService.get(route.params['username']) // Llama al método get del servicio ProfilesService con el parámetro 'username' de la ruta
      .pipe(
        catchError((err) => this.router.navigateByUrl('/')) // Si ocurre un error, navega a la ruta raíz
      );

    res.subscribe(data => console.log(data));

    return res;

  }
}