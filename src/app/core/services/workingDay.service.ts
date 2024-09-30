import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkingDay } from '../models/workingDay.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class WorkingDayService {
  constructor (
    private apiService: ApiService
  ) {}

    getAllWorkingDays(): Observable<WorkingDay[]> {
        return this.apiService.get(`/workingDays/`);
    }

}