import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RemindersModel } from "./reminders.model";

@Injectable({
  providedIn: "root",
})
export class RemindersService {
  url: string = environment.baseUrl + "v1/reminders/";

  // Data
  public rmodels: RemindersModel[] = [];
  public rmodel: RemindersModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<RemindersModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("RemindersModel", res);
      })
    );
  }

  get(): Observable<RemindersModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("RemindersModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<RemindersModel> {
    let urlID = this.url + id + "/";
    return this.http.get<RemindersModel>(urlID).pipe(
      tap((res: RemindersModel) => {
        console.log("RemindersModel", res);
        this.rmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<RemindersModel> {
    return this.http.patch<RemindersModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("RemindersModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("RemindersModel", res);
      })
    );
  }

  filter(field: string): Observable<RemindersModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<RemindersModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("RemindersModel", res);
      })
    );
  }
}
