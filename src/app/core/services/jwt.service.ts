import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getAccessToken(): String {
    return window.localStorage['accessToken'];
  }

  getRefreshToken(): String {
    return window.localStorage['refreshToken'];
  }


  saveAccessToken(token: String) {
    window.localStorage['accessToken'] = token;
  }

  saveRefreshToken(token: String) {
    window.localStorage['refreshToken'] = token;
  }

  destroyAccessToken() {
    window.localStorage.removeItem('accessToken');
  }

  destroyRefreshToken() {
    window.localStorage.removeItem('refreshToken');
  }


}
