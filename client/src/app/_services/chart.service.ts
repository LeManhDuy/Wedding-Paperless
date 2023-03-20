import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

  getRandomColor(): string {
    const colors = [
      '#FF7F7A',
      '#7FBCFF',
      '#7FF073',
      '#FFEE7F',
      '#AF7EDD',
      '#FF9F7C',
      '#E57FFF',
      '#8FD1FF',
      '#7FFF99',
      '#AA4D3A',
      '#8ED9D8',
      '#8ADA6F',
      '#BEBEBE',
      '#0A3463',
      '#444444',
      '#FF9892',
      '#92C6FF',
      '#92FFB9',
      '#FFE692',
      '#C193E1',
      '#FFB192',
      '#DCA3FF',
      '#9AC3FF',
      '#9EFFC7',
      '#CC6A52',
      '#B2E2E1',
      '#B3E27D',
      '#D8D8D8',
      '#0B2148',
      '#666666',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  getContentByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(this.prefixUrlContent);
  }

  getAccountByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(this.prefixUrlAccount);
  }
}
