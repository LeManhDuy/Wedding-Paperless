// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, map, Observable } from 'rxjs';
// import { AuthUser, RegisterUser } from '../models/app-user';
//
// @Injectable({
//   providedIn: "root"
// })
// export class AuthService{
//   headers = new HttpHeaders({
//     'Content-Type': 'application/json'
//   });
//   baseUrl = 'https://localhost:44328/api/auth/';
//   constructor(private _http:HttpClient) {
//   }
//
//   login(data: any): Observable<any> {
//     return this._http.post('https://localhost:44328/api/auth/login', data);
//   }
//   register(data: any): Observable<any> {
//     return this._http.post('https://localhost:44328/api/auth/login', data);
//   }
// }
