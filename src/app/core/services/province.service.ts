import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/province.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class ProvinceService {
  constructor (
    private apiService: ApiService
  ) {}

    getAllProvinces(): Observable<Province[]> {
        return this.apiService.get(`/provinces/`);
    }

}