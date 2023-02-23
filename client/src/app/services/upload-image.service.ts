import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  prefixUrl: string = environment.apiURL;
  baseUrl = this.prefixUrl + 'api/auth/albumn'

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    console.log("service", file);

    formData.append('file', file);
    this.http.post(`${this.baseUrl}`, formData).subscribe(
      response => {
        console.log('Upload successful');
      },
      error => {
        console.log('Upload failed');
      }
    );
  }

}
