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
    console.log(this.baseUrl)
    return this.http.get<Content[]>(`${this.baseUrl}`)
  }

  getContent(idContent: string): Observable<Content> {
    return this.http.get<Content>(this.baseUrl + idContent);
  }

  addContent(personId: string, content: Content): Observable<Content> {
    return this.http.post<Content>(this.baseUrl + personId, content);
  }

  // updateAlbumn(contentId: string, albumnId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
  //   return this.http.put<ImageHandler>(this.baseUrl + contentId + "&" + albumnId, imageHandler)
  // }

  deleteContent(idContent: string | undefined): Observable<Content> {
    if (idContent)
      return this.http.delete<Content>(`${this.baseUrl}${idContent}`)
    throw new Error()
  }
}
