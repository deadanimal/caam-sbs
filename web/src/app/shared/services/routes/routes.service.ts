import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RoutesModel } from "./routes.model";

@Injectable({
  providedIn: "root",
})
export class RoutesService {
  url: string = environment.baseUrl + "v1/routes/";

  // Data
  public rmodels: RoutesModel[] = [];
  public rmodel: RoutesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<RoutesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("RoutesModel", res);
      })
    );
  }

  get(): Observable<RoutesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("RoutesModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<RoutesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<RoutesModel>(urlID).pipe(
      tap((res: RoutesModel) => {
        console.log("RoutesModel", res);
        this.rmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<RoutesModel> {
    return this.http.patch<RoutesModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("RoutesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("RoutesModel", res);
      })
    );
  }

  filter(field: string): Observable<RoutesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<RoutesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("RoutesModel", res);
      })
    );
  }
}
