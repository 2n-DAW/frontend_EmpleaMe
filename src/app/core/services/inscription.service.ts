import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../models/inscription.model';
import { ApiService, UserService } from './';


@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class InscriptionService {
    constructor (
        private apiService: ApiService,
        private userService: UserService
    ) {}

    private userType: String = '';

    createInsciption(inscription: Inscription): Observable<Inscription[]> {
        this.userType = this.userService.getCurrentTypeUser();
        return this.apiService.postFromBaseUrl(`/inscription/`, this.userType, { inscription: inscription });
    }

    updateInsciption(inscription: Inscription): Observable<Inscription[]> {
        this.userType = this.userService.getCurrentTypeUser();
        return this.apiService.putFromBaseUrl(`/inscription/`, this.userType, { inscription: inscription });
    }

    // DELETE ONE
    // deleteJob(slug: String): Observable<Job[]> {
    //     return this.apiService.delete(`/jobs/${slug}`);
    // }
    
}
