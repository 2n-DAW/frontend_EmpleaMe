import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userType: string = '';

  constructor(
    private http: HttpClient
  ) {
    window.localStorage['userType'] ? this.userType = window.localStorage['userType'] : "";
    console.log(this.userType);
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  // PRUEBA INTERCEPTOR ==============================================
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    let setHeaders = new HttpHeaders();

    if (token) {
      setHeaders = setHeaders.set('Authorization', `Token ${token}`);
    }

    return setHeaders;
  }
  // =================================================================

  private getBaseUrl(): string {
    if (this.userType === 'client') {
      return environment.api_url1;
    } else if (this.userType === 'company') {
      return environment.api_url2;
    } else if (this.userType === 'recruit') {
      return environment.api_url3;
    }
    return environment.api_url1;
  }

  login_register(path: string, body: Object = {}): Observable<any> {
    const url = `${this.getBaseUrl()}${path}`;
    return this.http.post(
      url,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

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
    const url = `${environment.api_url1}${path}?${params.toString()}`;
    // console.log(url);
    
    // return this.http.get(url).pipe(catchError(this.formatErrors));
    return this.http.get(url, { headers: this.createAuthorizationHeader() }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url1}${path}`,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url1}${path}`,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url1}${path}`,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }
}