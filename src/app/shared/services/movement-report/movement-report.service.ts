import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MovementReport } from './movement-report.model';

@Injectable({
  providedIn: "root",
})
export class MovementReportService {
  url: string = environment.baseUrl + "v1/movement-report/";

  // Data
  public movementReport: MovementReport
  public movementReports: MovementReport[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<MovementReport> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("MovementReport", res);
      })
    );
  }

  get(): Observable<MovementReport[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("MovementReport", res);
        this.movementReports = res;
      })
    );
  }

  getOne(id: string): Observable<MovementReport> {
    let urlID = this.url + id + "/";
    return this.http.get<MovementReport>(urlID).pipe(
      tap((res: MovementReport) => {
        console.log("MovementReport", res);
        this.movementReport = res;
      })
    );
  }

  update(id: string, body: Form): Observable<MovementReport> {
    return this.http.patch<MovementReport>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("MovementReport", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("MovementReport", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<MovementReport[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<MovementReport[]>(urlFilter).pipe(
      tap((res) => {
        console.log("MovementReport", res);
      })
    );
  }
}
