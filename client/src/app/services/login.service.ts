import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {AuthUser, RegisterUser, UserToken} from '../models/app-user';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44328/api/auth/';
  private currentUser = new BehaviorSubject<UserToken | null>(null);

  currentUser$ = this.currentUser.asObservable();

  constructor(private _http: HttpClient) {
  }

  login(authUser: AuthUser): Observable<any> {
    return this._http.post(`${this.baseUrl}login`, authUser, {
      responseType: "text",
      headers: this.headers
    })
      .pipe(
        map((token) => {
          if (token) {
            const userToken: UserToken = {username: authUser.username, token}
            localStorage.setItem('userToken', JSON.stringify(userToken));
            this.currentUser.next(userToken);
          }
        })
      );
  }
}
