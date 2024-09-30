import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class ContractService {
  constructor (
    private apiService: ApiService
  ) {}

    getAllContracts(): Observable<Contract[]> {
        return this.apiService.get(`/contracts/`);
    }

}