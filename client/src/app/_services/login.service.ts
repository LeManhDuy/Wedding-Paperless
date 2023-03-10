import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, UserToken } from '../models/app-user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  isUser?:  BehaviorSubject<boolean> = new BehaviorSubject(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  roleToken?: string;


  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/';



  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  getUserRoleObser():Observable<boolean>{
    return this.isUser?.asObservable()!;
  }

  constructor(private _http: HttpClient,private auth: AuthService) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserToken>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public  currentUserValueBehaviorSubject(): BehaviorSubject<UserToken> {
    return this.currentUserSubject;
  }


  // login(loginUser: LoginUser): Observable<any> {
  //   return this._http.post(`${this.baseUrl}login`, loginUser, {
  //     responseType: "text",
  //     headers: this.headers
  //   })
  //     .pipe(map((response: any) => {
  //       let userInfo = new UserToken();
  //       const user = JSON.parse(response);
  //       if (user && user.token) {
  //         userInfo.username = user.username;
  //         userInfo.role = this.parseTokenToRole(user.token)
  //         userInfo.token = user.token;
  //         userInfo.id = user.id;
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         this.loggedIn.next(true);
  //         return userInfo;
  //       } else {
  //         throw new Error("Login failed");
  //       }
  //     }),
  //       catchError((error: HttpErrorResponse) => {
  //         console.log("Debug ", error.message)
  //         return throwError(() => new Error(error.message))
  //       }));
  // }

  login(loginUser: LoginUser): Observable<any> {
    return this._http.post(`${this.baseUrl}login`, loginUser, {
      responseType: "text",
      headers: this.headers
    })
      .pipe(map((response: any) => {
          let userInfo = new UserToken();
          const user = JSON.parse(response);
          
          if (user && user.token) {
            userInfo.username = user.username;
            userInfo.role = this.parseTokenToRole(user.token)
            userInfo.token = user.token;
            userInfo.id = user.id;
            this.auth.setLocalStorageValue(userInfo.role);
            console.log(userInfo);
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
          console.log("Debug ", error.message)
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
          }
          return throwError(() => new Error(errorMessage))
        }));
  }

  parseTokenToRole(token: string): string{
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payloadObject = JSON.parse(payloadJson);
    const role = payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new UserToken());
    this.loggedIn.next(false);
  }
}
