import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Zone } from '../module/zone';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private urlEndPoint:string = "http://localhost:8080/polygon";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http : HttpClient,
  private router: Router) { }

  create(zone : Zone) : Observable<Zone> {
    return this.http.post<Zone>(this.urlEndPoint, zone)
    .pipe(
      map( (response: any) => response as Zone),
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

  getAllZones(): Observable<Zone[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response: any) => response as Zone[]),
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

  getZonesPerPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+ '/page/' +page).pipe(
      map( (response: any) => {
        (response.content as Zone[]).map(zone =>{ 
          console.log(zone);
          zone.creationDate = formatDate(zone.creationDate, 'dd-MM-yyyy', 'en-US');
          return zone;
        });
        return response;
      }
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
    )
  }

}
