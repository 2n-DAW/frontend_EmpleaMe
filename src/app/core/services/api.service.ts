import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userType: String = '';

  constructor(
    private http: HttpClient,
  ) {}

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

  private getBaseUrl(userType: String): string {
    switch (userType) {
      case 'client':
        return environment.api_url1;
      case 'company':
        return environment.api_url2;
      case 'recruit':
        return environment.api_url3;
      default:
        return environment.api_url3;
    }
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

  login_register(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url4}${path}`,
      body,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }

  getCurrentUser(path: string, userType: String): Observable<any> {
    const url = this.getBaseUrl(userType);
    return this.http.get(
      `${url}${path}`,
      { headers: this.createAuthorizationHeader() }
    ).pipe(catchError(this.formatErrors));
  }
}