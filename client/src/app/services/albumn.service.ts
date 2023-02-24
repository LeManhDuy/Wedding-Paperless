import { Albumn, ImageHandler, AlbumnDelete } from './../models/albumn';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumnService {
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/albumn/'

  constructor(private http: HttpClient) {
  }

  getAllAlbumns(): Observable<Albumn[]> {
    return this.http.get<Albumn[]>(`${this.baseUrl}`)
  }

  addAlbumn(imageHandler: ImageHandler): Observable<ImageHandler> {
    return this.http.post<ImageHandler>(this.baseUrl + '3', imageHandler);
  }

  getAlbumn(id: string): Observable<Albumn> {
    return this.http.get<Albumn>(this.baseUrl + id);
  }

  deleteSelected(albumn: AlbumnDelete): Observable<AlbumnDelete> {
    const id = albumn.id;
    return this.http.delete<AlbumnDelete>(`${this.baseUrl}${id}`)
  }
  updateAlbumn(contentId: string, albumnId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
    return this.http.put<ImageHandler>(this.baseUrl + contentId + "&" + albumnId, imageHandler)
  }
}
