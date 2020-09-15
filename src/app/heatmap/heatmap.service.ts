import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  private urlEndPoint:string = "http://localhost:8080/";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

 constructor(private http : HttpClient) { }

 //getElement(page: number): Observable<any> {
  // return this.http.get(this.urlEndPoint+ 'page/' +page).pipe(
  //   map((response:any) =>{
  //     response.content as Incident[];
    //   return response;
    // }
  //    )
  // );
// }

// getAllElements(): Observable<any> {
  // return this.http.get(this.urlEndPoint).pipe(
  //   map((response:any) =>
      // response as Incident[]
  //    )
  // );
 //}
}
