import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class AuthService {

  tokenRoleObser? : BehaviorSubject<string | null>;

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

  getTokenRole():string {
    if(this.getTokenInformation()=== undefined){
      return "";
    }
    return this.getTokenInformation()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }


  getTokenName() {
    return this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  }

  constructor() {
    this.tokenRoleObser = new BehaviorSubject<string | null>(
      this.getTokenRole()
    );
  }

  public getLocalStorageChanges(): Observable<string | null> {
    return this.tokenRoleObser!.asObservable();
  }

  public setLocalStorageValue(value: string): void {
    localStorage.setItem('currentUser', value);
    this.tokenRoleObser!.next(this.getTokenRole());
  }

  public removeLocalStorageValue(): void {
    localStorage.removeItem('currentUser');
    this.tokenRoleObser!.next(null);
  }
}

