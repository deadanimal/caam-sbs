import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AircraftsModel } from "./aircrafts.model";

@Injectable({
  providedIn: "root",
})
export class AircraftsService {
  url: string = environment.baseUrl + "v1/aircrafts/";

  // Data
  public amodels: AircraftsModel[] = [];
  public amodel: AircraftsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AircraftsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AircraftsModel", res);
      })
    );
  }

  get(): Observable<AircraftsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AircraftsModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AircraftsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AircraftsModel>(urlID).pipe(
      tap((res: AircraftsModel) => {
        console.log("AircraftsModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AircraftsModel> {
    return this.http.patch<AircraftsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("AircraftsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AircraftsModel", res);
      })
    );
  }

  filter(field: string): Observable<AircraftsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AircraftsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AircraftsModel", res);
      })
    );
  }
}
