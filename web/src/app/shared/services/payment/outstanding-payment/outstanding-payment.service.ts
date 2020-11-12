import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { OutstandingPayement } from './outstanding-payment.model';

@Injectable({
  providedIn: "root",
})
export class OutstandingPaymentService {
  url: string = environment.baseUrl + "v1/outstanding-payment/";

  // Data
  public outstandingPayment: OutstandingPayement
  public outstandingPayments: OutstandingPayement[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<OutstandingPayement> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("outstandingPayment", res);
      })
    );
  }

  get(): Observable<OutstandingPayement[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("outstandingPayment", res);
        this.outstandingPayments = res;
      })
    );
  }

  getOne(id: string): Observable<OutstandingPayement> {
    let urlID = this.url + id + "/";
    return this.http.get<OutstandingPayement>(urlID).pipe(
      tap((res: OutstandingPayement) => {
        console.log("outstandingPayment", res);
        this.outstandingPayment = res;
      })
    );
  }

  update(id: string, body: Form): Observable<OutstandingPayement> {
    return this.http.patch<OutstandingPayement>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("outstandingPayment", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("outstandingPayment", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<OutstandingPayement[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<OutstandingPayement[]>(urlFilter).pipe(
      tap((res) => {
        console.log("outstandingPayment", res);
      })
    );
  }
}
