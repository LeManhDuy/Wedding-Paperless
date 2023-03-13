import { Content } from './../models/content';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, catchError, Observable, of, retry, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/assets/apiUrl';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import {Albumn} from "../models/albumn";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private existContent : BehaviorSubject<boolean> = new BehaviorSubject(false) ;
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/content/'

  constructor(private http: HttpClient,private loginService: LoginService, private auth:AuthService) {
  }

  checkContentIsExistByPersonId(): Observable<boolean>{
    if (this.auth.getTokenRole() == "admin"){
      return of(true);
    }
    const id = this.auth.getTokenId();
    const url = this.prefixUrl + API_URL.CONTET_IS_EXIST_BY_PERSON_ID(id!);
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
  getAlbumnsOfContent(id: string): Observable<Albumn[]> {
    return this.http.get<Albumn[]>(this.baseUrl + id + "/albumn");
  }
  getContent(contentId: string): Observable<Content> {
    return this.http.get<Content>(this.baseUrl + contentId);
  }

  getContentAttachAlbums(idPerson : string): Observable<Content>{
    const url = this.prefixUrl + API_URL.GET_CONTENT_BY_PERSON_ID_ATTACH_ALBUMS(Number.parseInt(idPerson));
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
    console.log("GET",contentId)

    if (contentId)
      console.log(this.baseUrl+contentId)
      return this.http.delete<Content>((this.baseUrl+contentId).trim()).pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }
  creatContent(content: Content ): Observable<Content> {
    const user = this.auth.getTokenId();

      const url = this.prefixUrl + API_URL.CREATE_CONTENT(user);
      content.wish = "Hope you join us";
      content.personName = "";
      content.personId = user
      return this.http.post<Content>(url,content)
  }
}
