import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = environment.baseUrl + "v1/dashboard/";

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    return this.http.get<any>(this.url + "dashboard/").pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
  get2(): Observable<any> {
    return this.http.get<any>(this.url + "dashboard_ops/").pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
  get3(body): Observable<any> {
    return this.http.post<any>(this.url + "dashboard_aln/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }


}
