import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CallsignsModel } from "./callsigns.model";

@Injectable({
  providedIn: "root",
})
export class CallsignsService {
  url: string = environment.baseUrl + "v1/callsigns/";

  // Data
  public callmodels: CallsignsModel[] = [];
  public callmodel: CallsignsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<CallsignsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("CallsignsModel", res);
      })
    );
  }

  get(): Observable<CallsignsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("CallsignsModel", res);
        this.callmodels = res;
      })
    );
  }

  getOne(id: string): Observable<CallsignsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<CallsignsModel>(urlID).pipe(
      tap((res: CallsignsModel) => {
        console.log("CallsignsModel", res);
        this.callmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<CallsignsModel> {
    return this.http.patch<CallsignsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("CallsignsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("CallsignsModel", res);
      })
    );
  }

  filter(field: string): Observable<CallsignsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<CallsignsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CallsignsModel", res);
      })
    );
  }
}
