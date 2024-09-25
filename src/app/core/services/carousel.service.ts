import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarouselDetails, CarouselHome } from '../../core/models/carousel.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CarouselService {
    constructor (
        private apiService: ApiService
    ) {}

    getCarouselHome(): Observable<CarouselHome[]> {
        return this.apiService.get(`/carousel/`);
    }

    getCarouselDetails(slug: String | null): Observable<CarouselDetails[]> {
        return this.apiService.get(`/carousel/${slug}`);
    }
}