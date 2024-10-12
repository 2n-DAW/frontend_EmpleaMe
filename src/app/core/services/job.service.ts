import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, UserJobs } from '../models/job.model';
import { ApiService } from './api.service';
import { Filters } from '../models/filters.model';


@Injectable({
  providedIn: 'root' // 'root' indica que este servicio será singleton en toda la aplicación
})
export class JobService {
    constructor (
        private apiService: ApiService
    ) {}

    // GET ALL - NO USAR
    getJobs(): Observable<Job[]> {
        return this.apiService.get(`/jobs/`);
    }

    // GET ALL JOBS WITH FILTERS
    getJobsFilter(filters: Filters): Observable<Job[]> {
        // Just pass the filters object directly
        return this.apiService.get('/jobs', filters);
    }

    // GET FEED ALL JOBS WITH FILTERS
    getFeedJobsFilter(filters: Filters): Observable<Job[]> {
        return this.apiService.get('/jobs/feed', filters);
    }

    // GET ONE JOB
    getJob(slug: String): Observable<Job> {
        return this.apiService.get(`/jobs/${slug}`);
    }

    // GET JOBS BY CATEGORY
    getJobsByCategory(slug: String): Observable<Job[]> {
        return this.apiService.get(`/jobsByCategory/${slug}`);
    }

    getUserJobs(userId: string): Observable<UserJobs> {
        return this.apiService.get(`/profiles/${userId}/jobs`);
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
    deleteJob(slug: String): Observable<Job[]> {
        return this.apiService.delete(`/jobs/${slug}`);
    }

    // SEARCH
    findJobsName(search: string): Observable<{ jobs: Job[] }> {
        return this.apiService.get(`/jobs?name=${search}`);
    }

    favorite(slug: String): Observable<Job> {
        return this.apiService.post(`/${slug}/favorite`);
    }

    unfavorite(slug: String): Observable<Job> {
        return this.apiService.delete(`/${slug}/unfavorite`);
    }
    
}
