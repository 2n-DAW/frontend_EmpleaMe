import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }

    getCurrentUserObservable(): Observable<User> { // Retorna un Observable de tipo User
        return this.currentUser;
    }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        console.log('populate called');

        const accessToken = this.jwtService.getAccessToken() || " ";
        const refreshToken = this.jwtService.getRefreshToken() || " ";
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        if (accessToken) {
            console.log('Access token found, calling apiService.get("/user")');
            this.apiService.get("/user").subscribe(
                (data) => {
                    console.log('apiService.get("/user") success:', data);
                    return this.setAuth({ ...data.user, accessToken });
                },
                (err) => {
                    this.generateAccessToken().subscribe(
                        (data) => {
                            return this.setAuth({ ...data.user });
                        },
                        (err) => {
                            console.log('generateAccessToken() error:', err);
                            this.purgeAuth();
                        }
                    );
                }
            );
        } else {
            console.log('No access token found, calling purgeAuth()');
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: User) {

        console.log(user.accessToken);
        console.log(user);
        // Save JWT sent from server in localstorage
        this.jwtService.saveAccessToken(user.accessToken);

        user.refreshToken && this.jwtService.saveRefreshToken(user.refreshToken);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }


    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyAccessToken();
        this.jwtService.destroyRefreshToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }


    generateAccessToken(): Observable<any> {
        console.log('shadkfasdhfkjlsdahfkljasdhfkljasdfh');
        return this.apiService.post('/user/refresh')
            .pipe(map(data => {
                this.setAuth(data.user);
                return data;
            }));
    }




    attemptAuth(type: any, credentials: any): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        const res = this.apiService.post(`/users${route}`, { user: credentials })
            .pipe(map(
                data => {
                    this.setAuth(data.user);
                    return data;
                }
            ));

        console.log(credentials);
        return res;
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user: any): Observable<User> {
        return this.apiService
            .put('/user', { user })
            .pipe(map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}
