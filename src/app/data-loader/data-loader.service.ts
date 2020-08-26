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

  uploadFile(file: File, latitude:string, longitude:string,
  separator:string, quote:string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("separator", separator);
    if(quote != "Ninguno") {
      formData.append("quote", quote);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload-file`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }


}
