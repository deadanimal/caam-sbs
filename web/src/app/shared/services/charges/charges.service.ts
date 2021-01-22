import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ChargesModel } from "./charges.model";

@Injectable({
  providedIn: "root",
})
export class ChargesService {
  url: string = environment.baseUrl + "v1/charges/";

  // Data
  public cmodels: ChargesModel[] = [];
  public cmodel: ChargesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<ChargesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ChargesModel", res);
      })
    );
  }

  get(): Observable<ChargesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ChargesModel", res);
        this.cmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ChargesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ChargesModel>(urlID).pipe(
      tap((res: ChargesModel) => {
        console.log("ChargesModel", res);
        this.cmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<ChargesModel> {
    return this.http.patch<ChargesModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("ChargesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ChargesModel", res);
      })
    );
  }

  filter(field: string): Observable<ChargesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ChargesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ChargesModel", res);
      })
    );
  }
}
