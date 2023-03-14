import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RegisterSong } from "../models/song";
import { API_URL } from 'src/assets/apiUrl';

@Injectable({
  providedIn: 'root'
})

export class RegisterSongService {
  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/register-song/'

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<RegisterSong[]> {
    return this.http.get<RegisterSong[]>(`${this.baseUrl}`);
  }

  addSong(contentId: string, registerSong: RegisterSong): Observable<RegisterSong> {
    return this.http.post<RegisterSong>(this.baseUrl + contentId, registerSong)
  }

  addSongByPersonId(personId: string, registerSong: RegisterSong): Observable<RegisterSong> {
    const url = this.prefixUrl + API_URL.REGISTER_SONG_BY_PERSON_ID(Number.parseInt(personId));
    return this.http.post<RegisterSong>(url, registerSong);
  }


  getSong(id: string): Observable<RegisterSong> {
    return this.http.get<RegisterSong>(this.baseUrl + id)
  }

  updateSong(registerSongId: string, registerSong: RegisterSong): Observable<RegisterSong> {
    return this.http.put<RegisterSong>(this.baseUrl + registerSongId, registerSong)
  }

  deleteSong(registerSongId: string | undefined): Observable<RegisterSong> {
    if (registerSongId)
      return this.http.delete<RegisterSong>(this.baseUrl + registerSongId)
    throw new Error()
  }
}
