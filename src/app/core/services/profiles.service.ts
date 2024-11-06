import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models/profile.model';
import { map } from 'rxjs/operators';
import { User, UserList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor(
    private apiService: ApiService
  ) { }

  get(username: string): Observable<Profile> {
    return this.apiService.get(`/profiles/${username}`)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  getInscriptionUser(userEmail: string): Observable<Profile> {
    return this.apiService.get(`/profiles/user_email`, userEmail)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post(`/profiles/${username}/follow`);
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete(`/profiles/${username}/unfollow`);
  }

  allFollowers(username: string, params: any): Observable<UserList> {
    return this.apiService.get(`/profiles/${username}/followers`, params);
  }

  allFollowing(username: string, params: any): Observable<UserList> {
    return this.apiService.get(`/profiles/${username}/following`, params);
  }


}