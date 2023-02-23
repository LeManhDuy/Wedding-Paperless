import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {LoginUser, RegisterUser, UserToken} from '../models/app-user';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/';
  private currentUser = new BehaviorSubject<UserToken | null>(null);

  currentUser$ = this.currentUser.asObservable();

  constructor(private _http: HttpClient) {
  }

  login(loginUser: LoginUser): Observable<any> {
    return this._http.post(`${this.baseUrl}login`, loginUser, {
      responseType: "text",
      headers: this.headers
    })
      .pipe(
        map((token) => {
          if (token) {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payloadObject = JSON.parse(payloadJson);
            console.log(token)
            console.log(payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

            return token
            // const userToken: UserToken = {}
            // localStorage.setItem('userToken', JSON.stringify(userToken));
            // this.currentUser.next(userToken);
          } else {
            throw new Error("Login failed");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return of(null);
        })
      );
  }
}
