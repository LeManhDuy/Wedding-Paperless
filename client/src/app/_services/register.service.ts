import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { RegisterUser, UserToken } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/register'

  private currentUser = new BehaviorSubject<UserToken | null>(null)

  currentUser$ = this.currentUser.asObservable()

  constructor(private httpClient: HttpClient) { }

  register(registerUser: RegisterUser) {
    return this.httpClient
      .post(`${this.baseUrl}`, registerUser, {
        responseType: 'text',
        headers: this.headers
      })
    // .pipe(
    //   map((token) => {
    //     if (token) {
    //       const userToken: UserToken = { username: registerUser.username, token }
    //       localStorage.setItem('userToken', JSON.stringify(userToken));
    //       this.currentUser.next(userToken);
    //     }
    //   })
    // );
  }

}