import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileData } from 'src/app/module/fileData';
import { Zone } from 'src/app/module/zone';
import { Layer } from 'src/app/module/layer';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  private urlEndPoint:string = "http://localhost:8080/analysis";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http : HttpClient) { }

  getAllFileData(): Observable<any> {
    let params = new HttpParams();
    return this.http.get(`${this.urlEndPoint}/file-data`, {params: params}).pipe(
      map((response:any) =>
        response as FileData[]
       )
    );
  }

  getFiltersByHeader(name: string, header: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('file-name', name);
    params = params.append('header', header);

    return this.http.get(`${this.urlEndPoint}/filter`, {params: params}).pipe(
      map((response:any) =>
        response as String[]
       )
    );
  }

  getFunctions(): Observable<String[]> {
    return this.http.get(`${this.urlEndPoint}/functions`).pipe(
      map((response:any) =>
        response as String[]
       )
    );
  }

  getFilteredElements(fileName: string, field: string, fieldValue: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('file-name', fileName);
    params = params.append('field', field);
    params = params.append('field-value', fieldValue);

    return this.http.get(`${this.urlEndPoint}/elements`, {params: params}).pipe(
      map((response:any) =>
        response as String[]
       )
    );
  }

  createMap(layer: Layer): Observable<any> {
    let params = new HttpParams();

    return this.http.post<Layer>(this.urlEndPoint, layer).pipe(
      map((response:any) =>
        response as Element[]
       ),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

}
