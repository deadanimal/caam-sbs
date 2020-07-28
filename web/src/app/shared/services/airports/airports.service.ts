import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AirportsModel } from "./airports.model";

@Injectable({
  providedIn: "root",
})
export class AirportsService {
  url: string = environment.baseUrl + "v1/airports/";

  // Data
  public airmodels: AirportsModel[] = [];
  public airmodel: AirportsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AirportsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AirportsModel", res);
      })
    );
  }

  get(): Observable<AirportsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AirportsModel", res);
        this.airmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AirportsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AirportsModel>(urlID).pipe(
      tap((res: AirportsModel) => {
        console.log("AirportsModel", res);
        this.airmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AirportsModel> {
    return this.http.patch<AirportsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("AirportsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AirportsModel", res);
      })
    );
  }

  filter(field: string): Observable<AirportsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AirportsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AirportsModel", res);
      })
    );
  }
}
