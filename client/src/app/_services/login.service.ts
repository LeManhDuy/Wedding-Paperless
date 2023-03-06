import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, UserToken } from '../models/app-user';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/';



  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  constructor(private _http: HttpClient) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserToken>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginUser: LoginUser): Observable<any> {
    return this._http.post(`${this.baseUrl}login`, loginUser, {
      responseType: "text",
      headers: this.headers
    })
      .pipe(map((response: any) => {
        let userInfo = new UserToken();
        const user = JSON.parse(response);

        if (user && user.token) {
          const payloadBase64 = user.token.split('.')[1];
          const payloadJson = atob(payloadBase64);
          const payloadObject = JSON.parse(payloadJson);
          userInfo.username = user.username;
          userInfo.role = payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          userInfo.token = user.token
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          return userInfo;
        } else {
          throw new Error("Login failed");
        }
      }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return of(null);
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new UserToken());
    this.loggedIn.next(false);
  }
}
