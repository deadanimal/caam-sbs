import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { TflVfr } from './tfl-vfr.model';

@Injectable({
  providedIn: "root",
})

export class TflVfrService {
  url: string = environment.baseUrl + "v1/tfl-vfr/";

  // Data
  public tflVfr: TflVfr
  public tflVfrs: TflVfr[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<TflVfr> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("TflVfr", res);
      })
    );
  }

  get(): Observable<TflVfr[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("TflVfr", res);
        this.tflVfrs = res;
      })
    );
  }

  getOne(id: string): Observable<TflVfr> {
    let urlID = this.url + id + "/";
    return this.http.get<TflVfr>(urlID).pipe(
      tap((res: TflVfr) => {
        console.log("TflVfr", res);
        this.tflVfr = res;
      })
    );
  }

  update(id: string, body: Form): Observable<TflVfr> {
    return this.http.patch<TflVfr>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("TflVfr", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("TflVfr", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<TflVfr[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<TflVfr[]>(urlFilter).pipe(
      tap((res) => {
        console.log("TflVfr", res);
      })
    );
  }
}

