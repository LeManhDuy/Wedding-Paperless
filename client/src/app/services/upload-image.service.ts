import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/register'
  
  constructor() { }
}
