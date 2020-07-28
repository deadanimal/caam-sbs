import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RatesModel } from "./rates.model";

@Injectable({
  providedIn: "root",
})
export class RatesService {
  url: string = environment.baseUrl + "v1/rates/";

  // Data
  public rmodels: RatesModel[] = [];
  public rmodel: RatesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<RatesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("RatesModel", res);
      })
    );
  }

  get(): Observable<RatesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("RatesModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<RatesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<RatesModel>(urlID).pipe(
      tap((res: RatesModel) => {
        console.log("RatesModel", res);
        this.rmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<RatesModel> {
    return this.http.patch<RatesModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("RatesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("RatesModel", res);
      })
    );
  }

  filter(field: string): Observable<RatesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<RatesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("RatesModel", res);
      })
    );
  }
}
