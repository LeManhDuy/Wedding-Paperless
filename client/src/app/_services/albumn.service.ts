import { Albumn, ImageHandler, AlbumnDelete } from './../models/albumn';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

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

  deleteSelected(id: string | undefined): Observable<AlbumnDelete> {
    if (id)
      return this.http.delete<AlbumnDelete>(`${this.baseUrl}${id}`)
    throw new Error()
  }
  updateAlbumn(id: string, imageHandler: ImageHandler): Observable<ImageHandler> {
    console.log("service", id, imageHandler);
    return this.http.put<ImageHandler>(this.baseUrl + 'edit/' + id, imageHandler)
  }
}