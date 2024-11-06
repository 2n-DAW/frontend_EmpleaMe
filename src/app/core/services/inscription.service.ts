import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription, InscriptionList } from '../models/inscription.model';
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

    createInscription(inscription: Inscription): Observable<Inscription[]> {
        this.userType = this.userService.getCurrentTypeUser();
        return this.apiService.postFromBaseUrl(`/inscription/`, this.userType, { inscription: inscription });
    }

    updateInscription(inscription: Inscription): Observable<Inscription[]> {
        this.userType = this.userService.getCurrentTypeUser();
        return this.apiService.putFromBaseUrl(`/inscription/`, this.userType, { inscription: inscription });
    }

    getInscriptions(): Observable<InscriptionList[]> {
        this.userType = this.userService.getCurrentTypeUser();
        return this.apiService.getFromBaseUrl(`/inscription/`, this.userType);
    }

    // DELETE ONE
    // deleteJob(slug: String): Observable<Job[]> {
    //     return this.apiService.delete(`/jobs/${slug}`);
    // }
    
}
