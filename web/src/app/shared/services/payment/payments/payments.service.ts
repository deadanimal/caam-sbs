import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { PaymentsModel } from "./payments.model";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  url: string = environment.baseUrl + "v1/payments/";

  // Data
  public pmodels: PaymentsModel[] = [];
  public pmodel: PaymentsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<PaymentsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("PaymentsModel", res);
      })
    );
  }

  get(): Observable<PaymentsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("PaymentsModel", res);
        this.pmodels = res;
      })
    );
  }

  getOne(id: string): Observable<PaymentsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<PaymentsModel>(urlID).pipe(
      tap((res: PaymentsModel) => {
        console.log("PaymentsModel", res);
        this.pmodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<PaymentsModel> {
    return this.http.patch<PaymentsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("PaymentsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("PaymentsModel", res);
      })
    );
  }

  filter(field: string): Observable<PaymentsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<PaymentsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("PaymentsModel", res);
      })
    );
  }
}
