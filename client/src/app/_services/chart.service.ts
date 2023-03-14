import { Injectable } from '@angular/core';
import {QuantityByTime} from "../models/chart";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  baseUrl: string = environment.apiURL;
  prefixUrlAccount = this.baseUrl + 'api/account/count-account-by-datetime'
  prefixUrlContent = this.baseUrl + 'api/content/count-contents-by-datetime'

  constructor(private http: HttpClient) { }
  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  getContentByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(this.prefixUrlContent);
  }
  getAccountByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(this.prefixUrlAccount);
  }
}
