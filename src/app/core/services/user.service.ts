import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map , distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // objeto User con la información del usuario
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged()); // emite valores solo si hay cambios

  // gugarda el estado de la autentificación
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken();
    // console.log(token);
    if (token) {
      this.apiService.get("/user").subscribe(
        (data) => {
          // console.log(data);
          return this.setAuth({ ...data.currentUser });
        },
        (err) => {

          this.purgeAuth();
        }
      );
    } else {
      // Remove any potential remnants of previous auth states

      this.purgeAuth();
      // this.router.navigate(['/login']);
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: any, credentials: any): Observable<User> {
    const route = (type === 'login') ? '/login' : '/register';
    return this.apiService.post(`/users${route}`, {user: credentials})
      .pipe(map(
      data => {
        if (type === 'login') this.setAuth(data.user);
        console.log(data.user);
        return data.user;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<User> {
    return this.apiService
    .put(`/user`, { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  logout() {
    this.apiService.get("/user/logout").subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
