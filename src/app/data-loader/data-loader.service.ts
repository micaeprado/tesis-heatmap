import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private urlEndPoint:string = "http://localhost:8080/data-loader";

  constructor(
    private http : HttpClient,
  ){}

  uploadFile(file: File, latitude:string, longitude:string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload-file`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }


}
