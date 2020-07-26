import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InvoicesModel } from "./invoices.model";

@Injectable({
  providedIn: "root",
})
export class InvoicesService {
  url: string = environment.baseUrl + "v1/invoices/";

  // Data
  public imodels: InvoicesModel[] = [];
  public imodel: InvoicesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<InvoicesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InvoicesModel", res);
      })
    );
  }

  get(): Observable<InvoicesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InvoicesModel", res);
        this.imodels = res;
      })
    );
  }

  getOne(id: string): Observable<InvoicesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InvoicesModel>(urlID).pipe(
      tap((res: InvoicesModel) => {
        console.log("InvoicesModel", res);
        this.imodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InvoicesModel> {
    return this.http.patch<InvoicesModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("InvoicesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InvoicesModel", res);
      })
    );
  }

  filter(field: string): Observable<InvoicesModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<InvoicesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InvoicesModel", res);
      })
    );
  }
}
