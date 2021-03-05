import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { DisputeModel } from  "./dispute.model";

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  url: string = environment.baseUrl + "v1/dispute/";

  disputemodels: DisputeModel[] = [];

  constructor(private http: HttpClient) { }

  assignUser(body): Observable<any> {
    return this.http.post<any>(this.url + "assignDispute/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  submit(body): Observable<any> {
    return this.http.post<any>(this.url + "submit/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  reject(body): Observable<any> {
    return this.http.post<any>(this.url + "reject/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getfilteredCID(body): Observable<any> {
    return this.http.post<any>(this.url + "getFilteredCID/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getfilteredHOD(body): Observable<any> {
    return this.http.post<any>(this.url + "getdisputedfpls/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getfilteredHOD_2(body): Observable<any> {
    return this.http.post<any>(this.url + "getdisputedfpls_2/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }


  archieve(body): Observable<any> {
    return this.http.post<any>(this.url + "archive/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

     
  getFilter(body): Observable<any> {
    return this.http.post<any>(this.url + "getfilter/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  createNote(body): Observable<any> {
    return this.http.post<any>(this.url + "createnote/", body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }




  get(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("dispute", res);
      })
    )
  }
}
