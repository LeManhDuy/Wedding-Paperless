import { Albumn, ImageHandler } from './../models/albumn';
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

  addAlbumn(imageHandler: ImageHandler): Observable<ImageHandler> {
    return this.http.post<ImageHandler>(this.baseUrl + '/1', imageHandler);
  }

}
