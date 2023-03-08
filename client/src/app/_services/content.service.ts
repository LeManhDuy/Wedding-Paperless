import { Content } from './../models/content';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/assets/apiUrl';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private existContent : BehaviorSubject<boolean> | undefined ;
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/content/'

  constructor(private http: HttpClient,private loginService: LoginService, private auth:AuthService) { 
  }
  
  checkContentIsExistByPersonId(): Observable<boolean>{
    const id = this.auth.getTokenId();
    const url = this.prefixUrl + API_URL.CONTET_IS_EXIST_BY_PERSON_ID(id);
    return this.http.get<boolean>(url).pipe(
      catchError((error) => {
      console.error(error);
      return throwError(error);
    }))
  }

  getExistContent():Observable<boolean> | undefined{
      return this.existContent?.asObservable();
  }
  setExistContent(value : boolean):any{
     this.existContent?.next(value);
}

  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.baseUrl}`)
  }

  getContent(contentId: string): Observable<Content> {
    return this.http.get<Content>(this.baseUrl + contentId);
  }

  getContentAttachAlbums(): Observable<Content>{
    const user = this.auth.getTokenId();
    console.log(user);
    
    const url = this.prefixUrl + API_URL.GET_CONTENT_BY_ID_ATTACH_ALBUMS(user);
    return this.http.get<Content>(url)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  addContent(personId: string, content: Content): Observable<Content> {
    return this.http.post<Content>(this.baseUrl + personId, content);
  }

  // updateAlbumn(contentId: string, albumnId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
  //   return this.http.put<ImageHandler>(this.baseUrl + contentId + "&" + albumnId, imageHandler)
  // }

  deleteContent(contentId: string | undefined): Observable<Content> {
    if (contentId)
      return this.http.delete<Content>(`${this.baseUrl}${contentId}`)
    throw new Error()
  }
  creatContent(content: Content ): Observable<Content> {
    const user = this.auth.getTokenId();
      
      const url = this.prefixUrl + API_URL.CREATE_CONTENT(user);
      content.wish = "Hope you join us";
      content.personName = "";
      return this.http.post<Content>(url,content).pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }
}
