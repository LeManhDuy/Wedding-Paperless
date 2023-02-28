import { Content } from './../models/content';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/content/'

  constructor(private http: HttpClient) { }

  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.baseUrl}`)
  }

}
