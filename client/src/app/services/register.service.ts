import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { RegisterUser, UserToken } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  baseUrl = 'http://127.0.0.1:5001/' + 'api/auth/register'

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
      //   map((response) => {
      //     console.log("Registration successful");
      //     // Do something with the response if needed
      //   }),
      //   catchError((error) => {
      //     console.log("Error registering user", error.error);
      //     return error;
      //   })
      // );
  }
  

}