import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountInfo, PersonInfo} from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class EditAccountService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  prefixUrl: string = environment.apiURL;
  baseUrlAccount = this.prefixUrl +'api/account/'
  baseUrlPerson = this.prefixUrl + 'api/person/'
  constructor(private http: HttpClient) { }

  getPerson(id: string) : Observable<PersonInfo>{
    return this.http.get<PersonInfo>(this.baseUrlPerson + id);
  }

  updatePerson(id: string, personInfo: PersonInfo) : Observable<PersonInfo>{
    console.log(id, personInfo)
    // return this.http.patch<PersonInfo>(this.baseUrlPerson + id, personInfo)
    return new Observable<PersonInfo>()
  }
}
