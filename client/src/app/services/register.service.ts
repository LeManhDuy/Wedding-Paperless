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

  baseUrl = 'https://localhost:44328/' + 'api/auth/register'

  private currentUser = new BehaviorSubject<UserToken | null>(null)

  currentUser$ = this.currentUser.asObservable()

  constructor(private httpClient: HttpClient) { }

  register(registerUser: RegisterUser) {
    console.log("2", registerUser);

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
