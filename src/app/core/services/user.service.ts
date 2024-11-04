import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserTypeService } from './userType.service';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    // objeto User con la información del usuario
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged()); // emite valores solo si hay cambios

    // guarda el estado de la autentificación
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    // guarda el tipo de usuario
    private currentUserTypeSubject = new BehaviorSubject<String>('null');
    public currentUserType = this.currentUserTypeSubject.asObservable().pipe(distinctUntilChanged()); // emite valores solo si hay cambios

    constructor (
        private apiService: ApiService,
        private jwtService: JwtService,
        private userTypeService: UserTypeService,
        private router: Router
    ) {}

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        const token = this.jwtService.getToken();
        const userType = this.getCurrentTypeUser();
        
        if (token) {
            this.apiService.getCurrentUser("/user", userType).subscribe(
                (data) => {
                    return this.setAuth(data.user, data.type, 'populate');
                },
                (err) => {
                    this.purgeAuth();
                }
            );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: User, userType: String, from: String) {
        if (from === 'login') {
            // Save JWT sent from server in localstorage
            this.jwtService.saveToken(user.token);
        }
        // Save userType from server in localstorage
        this.userTypeService.saveUserType(userType);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
        // Set current Role User
        this.currentUserTypeSubject.next(userType);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Remove userType from localstorage
        this.userTypeService.destroyUserType();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
        // Set current Role User to null
        this.currentUserTypeSubject.next('null');
    }

    attemptAuth(type: String, credentials: {}, userType?: String): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        const body = (type === 'login') ? { user: credentials } : { user: credentials, userType: userType };
        
        return this.apiService.login_register(`/user${route}`, body)
            .pipe(map(
                data => {
                    if (type === 'login') {
                        this.setAuth(data.user.user, data.type, 'login');
                        return data.user; 
                    };
                }
            ));
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    getCurrentTypeUser(): String {
        return this.userTypeService.getUserType();
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
        const userType = this.getCurrentTypeUser();
        if (userType === 'client') {
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

}
