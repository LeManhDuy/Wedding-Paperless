import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {API_URL} from '../../assets/apiUrl';
import {handleError} from '../../assets/handleError';
import { ResetPassword } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  prefixUrl: string = environment.apiURL;
  
  constructor(private _http: HttpClient) { }
  getVerifyCode(email: string| undefined):Observable<any>{
    const baseUrl: string = this.prefixUrl + API_URL.GET_CODE_BY_EMAIL(email!);
    return this._http.post(baseUrl,{
      responseType: 'text',
      headers: new HttpHeaders({ 'Content-Type': 'text' })
    }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  validateCode(verifycode: string):Observable<any> {
    const baseUrl: string = this.prefixUrl + API_URL.VALIDATE_VERIFY_CODE(verifycode!);
    return this._http.post(baseUrl, {
      responseType: 'text',
      headers: new HttpHeaders({ 'Content-Type': 'text' })
    }).pipe(catchError((error) => {
      console.error(error);
      return throwError(error);
    }))
  }

  ResetPassword(newPassword: ResetPassword):Observable<any>{
    const baseUrl: string = this.prefixUrl + API_URL.RESET_PASSWORD();
    return this._http.post(baseUrl,newPassword, {
      responseType: 'text',
      headers: new HttpHeaders({ 'Content-Type': ' application/json ' },
      )
    }).pipe(catchError((error) => {
      console.error(error);
      return throwError(error);
    }))     
  }


}
