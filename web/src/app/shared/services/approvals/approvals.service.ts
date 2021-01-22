import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApprovalsModel } from "./approvals.model";

@Injectable({
  providedIn: "root",
})
export class ApprovalsService {
  url: string = environment.baseUrl + "v1/approvals/";

  // Data
  public appmodels: ApprovalsModel[] = [];
  public appmodel: ApprovalsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<ApprovalsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
      })
    );
  }

  get(): Observable<ApprovalsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
        this.appmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ApprovalsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ApprovalsModel>(urlID).pipe(
      tap((res: ApprovalsModel) => {
        console.log("ApprovalsModel", res);
        this.appmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<ApprovalsModel> {
    return this.http.patch<ApprovalsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
      })
    );
  }

  filter(field: string): Observable<ApprovalsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ApprovalsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
      })
    );
  }

  approval(id: string, body, type: string): Observable<ApprovalsModel> {
    let url = this.url + id + "/" + type + "/";
    return this.http.patch<ApprovalsModel>(url, body).pipe(
      tap((res) => {
        console.log("ApprovalsModel", res);
      })
    );
  }
}
