import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from './job.service';

@Injectable({
    providedIn: 'root'
})
export class JobsResolverService implements Resolve<any> {

    constructor(private jobService: JobService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const userId = route.paramMap.get('username') ?? '';

        const res = this.jobService.getUserJobs(userId);
        console.log(res);
        return res;
    }
}