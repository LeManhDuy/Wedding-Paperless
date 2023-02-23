import { Albumn } from './../models/albumn';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumnService {

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/albumn'

  constructor(private http: HttpClient) { }

  getAllAlbumns(): Observable<Albumn[]> {
    return this.http.get<Albumn[]>(`${this.baseUrl}`)
  }

}
