import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RegisterSong } from "../models/song";

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
    console.log(this.baseUrl + contentId, registerSong)
    return this.http.post<RegisterSong>(this.baseUrl + contentId, registerSong)
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
