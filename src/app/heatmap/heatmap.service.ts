import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from './incident';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  private urlEndPoint:string = "http://localhost:8080/incident";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

 constructor(private http : HttpClient) { }

 getIncidents(page: number): Observable<any> {
   return this.http.get(this.urlEndPoint+ '/page/' +page).pipe(
     map((response:any) =>{
       response.content as Incident[];
       return response;
     }
      )
   );
 }

 getAllIncidents(): Observable<any> {
   return this.http.get(this.urlEndPoint).pipe(
     map((response:any) =>
       response as Incident[]
      )
   );
 }
}
