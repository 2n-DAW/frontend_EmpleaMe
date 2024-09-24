import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from './job.service';
import { Job } from '../../core/models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<Job> {
  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.jobService.get_job(route.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}