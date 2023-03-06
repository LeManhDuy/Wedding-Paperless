import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class AuthService {

  getTokenInformation() {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const payloadBase64 = JSON.parse(token).token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payloadObject = JSON.parse(payloadJson);
      return payloadObject
    }
  }

  getTokenId() {
    return this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
  }

  getTokenRole() {
    return this.getTokenInformation()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }

  getTokenName() {
    return this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  }

}
