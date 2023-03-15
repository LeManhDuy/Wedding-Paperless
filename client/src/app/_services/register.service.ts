import { environment } from './../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
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
    .pipe(
      map((response) => {
        return response
      }),
      catchError(catchError((error: HttpErrorResponse) => {
        console.log("Debug ", error.message)
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(error.message))
      }))
    );
  }

}
