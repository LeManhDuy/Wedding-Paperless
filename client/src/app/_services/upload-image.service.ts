import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImageSnippet } from '../component/albumn/albumn.component';
import { AlbumnService } from './albumn.service';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL } from 'src/assets/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/register'

  constructor(private album: AlbumnService, private _http: HttpClient) { }

  processFileToBase64(imageInput: any) : Promise<string> {
    return new Promise((resolve, reject) => {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const imageSnippet = new ImageSnippet(event.target.result, file).src;
      resolve(imageSnippet);
    });
    reader.addEventListener('error', (event) => {
      reject(event);
    });
    reader.readAsDataURL(file);
   })
  };
  processConvertBase64ToUrl(base64: string ): Observable<string>{
    const url :string = this.prefixUrl + API_URL.CONVERT_BASE64_TO_URL();

    return this._http.post(url,JSON.stringify(base64),{
        responseType: "text",
        headers: new HttpHeaders({ 'Content-Type': 'application/json' },)
      }).pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )
  }

}
