import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, paramsObj: any = {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('accessToken'),
      'Refresh': 'Token ' + localStorage.getItem('refreshToken')
    });

    let params_result = {};
    for (const key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params_result = { ...params_result, [key]: paramsObj[key] };
      }
    }
    const params = new HttpParams({ fromObject: params_result });

    const url = `${environment.api_url}${path}?${params.toString()}`;
    console.log(url);

    return this.http.get(url, { headers }).pipe(
      catchError(this.formatErrors)
    );
  }





  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('accessToken'),
      'Refresh': 'Token ' + localStorage.getItem('refreshToken')
    });

    console.log(path, body);
    const ruta = `${environment.api_url}${path}`;
    console.log(ruta);
    const res = this.http.post(ruta, body, { headers }).pipe(
      catchError(this.formatErrors)
    );
    console.log(res);
    return res;
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}