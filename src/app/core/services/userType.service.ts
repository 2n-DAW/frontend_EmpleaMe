import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  getUserType(): String {
    return window.localStorage['userType'];
  }

  saveUserType(userType: String) {
    window.localStorage['userType'] = userType;
  }

  destroyUserType() {
    window.localStorage.removeItem('userType');
  }

}
