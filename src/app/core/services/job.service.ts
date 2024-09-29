import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { ApiService } from './api.service';
import { Filters } from '../models/filters.model';


@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class JobService {
    constructor (
        private apiService: ApiService
    ) {}

    // GET ALL
    getJobs(): Observable<Job[]> {
        return this.apiService.get(`/jobs/`);
    }

    // GET ONE
    getJob(slug: String): Observable<Job> {
        return this.apiService.get(`/jobs/${slug}`);
    }

    // GET JOBS BY CATEGORY
    getJobsByCategory(slug: String): Observable<Job[]> {
        return this.apiService.get(`/jobsByCategory/${slug}`);
    }

    // CREATE
    // create_job(product: Job): Observable<Job[]> {
    //     return this.http.post<Job[]>(URL, product);
    // }

    // UPDATE ONE
    // update_job(product: Job, slug: String): Observable<Job[]> {
    //     return this.http.put<Job[]>(`${URL}/${slug}`, product);
    // }

    // DELETE ONE
    deleteJob(slug: any): Observable<Job[]> {
        return this.apiService.delete(`/jobs/${slug}`);
    }

    // DELETE ALL
    // delete_all_jobs(): Observable<Job[]> {
    //     return this.http.delete<Job[]>(`${URL}`);
    // }

    // SEARCH
    findJobsName(search: string): Observable<{ jobs: Job[] }> {
        return this.apiService.get(`/jobs?name=${search}`);
    }
    
    getJobsFilter(filters: Filters): Observable<Job[]> {
        // Just pass the filters object directly
        return this.apiService.get('/jobs', filters);
    }
    
}
