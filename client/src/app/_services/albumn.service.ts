import { Albumn, ImageHandler, AlbumnDelete, AlbumnRequest } from './../models/albumn';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from "../../environments/environment";
import { API_URL } from 'src/assets/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AlbumnService {
  public currentContentId : number| undefined;
  public currentAlbumFirstPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumSecondListPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumThirtPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumFourthListPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumFifthPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumSixthPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumSeventhPo : AlbumnRequest = new AlbumnRequest() ;
  public currentAlbumEightthPo : AlbumnRequest = new AlbumnRequest() ;

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/albumn/'

  constructor(private http: HttpClient) {
  }
  getAllAlbumns(): Observable<Albumn[]> {
    return this.http.get<Albumn[]>(`${this.baseUrl}`)
  }

  addAlbumn(contentId: string, imageHandler: ImageHandler): Observable<ImageHandler> {
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

  updateAlbumnV1(contentId: string, albumnId: string, imageHandler: AlbumnRequest): Observable<ImageHandler> {
    return this.http.put<ImageHandler>(this.baseUrl + contentId + "&" + albumnId, imageHandler)
  }


  updateListAlbumn(contentId: string,imageHandler: AlbumnRequest[]): Observable<any> {

    const url = this.prefixUrl + API_URL.UPDATE_LIST_ALBUM_BY_CONTENT_ID(Number.parseInt(contentId));
    return this.http.put<any>(url,imageHandler);
  }


  createListOfAlbum(albumlist: AlbumnRequest[], contentId : number): Observable<ImageHandler[]> {

    const url = this.prefixUrl + API_URL.CREATE_ALBUMS(contentId);

    return this.http.post<ImageHandler[]>(url,albumlist, {
      responseType: 'json',
      headers: new HttpHeaders({ 'Content-Type': ' application/json ' },
      )
    }).pipe(catchError((error) => {
      console.error(error);
      return throwError(error);
    })
    )
  }

}
