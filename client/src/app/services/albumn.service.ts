import { Albumn, ImageHandler, AlbumnDelete } from './../models/albumn';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "../../environments/environment";

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

  addAlbumn(contentId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
    console.log(contentId, imageHandler);
    return this.http.post<ImageHandler>(this.baseUrl + contentId, imageHandler);
  }

  getAlbumn(id: string): Observable<Albumn> {
    return this.http.get<Albumn>(this.baseUrl + id);
  }

  deleteSelected(id: string | undefined): Observable<AlbumnDelete> {
    if (id)
      return this.http.delete<AlbumnDelete>(`${this.baseUrl}${id}`)
    throw new Error()
  }
  updateAlbumn(contentId: string, albumnId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
    return this.http.put<ImageHandler>(this.baseUrl + contentId + "&" + albumnId, imageHandler)
  }
}
