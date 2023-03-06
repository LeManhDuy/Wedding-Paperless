import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountInfo} from "../models/account";
import {HttpClient} from "@angular/common/http";
import {Albumn, AlbumnDelete, ImageHandler} from "../models/albumn";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/account/'

  constructor(private http: HttpClient) {
  }

  getAllAccounts(): Observable<AccountInfo[]> {
    console.log(this.baseUrl)
    return this.http.get<AccountInfo[]>(`${this.baseUrl}`)
  }

  // addAccount(accountHandler: AccountHandle): Observable<AccountHandle> {
  //   console.log(accountHandler);
  //   return this.http.post<AccountHandle>(this.baseUrl, accountHandler);
  // }

  getAccount(id: string): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(this.baseUrl + id);
  }
}
