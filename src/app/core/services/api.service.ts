
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

  // PRUEBA INTERCEPTOR ============================
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    let setHeaders = new HttpHeaders();

    if (token) {
      setHeaders = setHeaders.set('Authorization', `Token ${token}`);
    }

    return setHeaders;
  }
  // ==================================================

  get(path: string, paramsObj: any = {}): Observable<any> {
    let params_result = {};
    
    for(const key in paramsObj) {
      if(paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params_result = { ...params_result, [key]: paramsObj[key] };  
      }
    }
    // console.log(params_result);

    const params = new HttpParams({ fromObject: params_result });
    // console.log(params.toString());
    const url = `${environment.api_url}${path}?${params.toString()}`;
    console.log(url);
    
    // return this.http.get(url).pipe(catchError(this.formatErrors));
    return this.http.get(url, { headers: this.createAuthorizationHeader() }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }
}