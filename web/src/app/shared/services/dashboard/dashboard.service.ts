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
  //url: string = "http://127.0.0.1:8000/v1/dashboard/";

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
}
