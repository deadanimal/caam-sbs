import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { PaymentListNewPayment } from './payment-list-new-payment.model';

@Injectable({
  providedIn: "root",
})
export class PaymentListNewPaymentService {
  url: string = environment.baseUrl + "v1/outstanding-payment/";

  // Data
  public paymentListNewPayment: PaymentListNewPayment
  public paymentListNewPayments: PaymentListNewPayment[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<PaymentListNewPayment> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("PaymentListNewPayment", res);
      })
    );
  }

  get(): Observable<PaymentListNewPayment[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("PaymentListNewPayment", res);
        this.paymentListNewPayments = res;
      })
    );
  }

  getOne(id: string): Observable<PaymentListNewPayment> {
    let urlID = this.url + id + "/";
    return this.http.get<PaymentListNewPayment>(urlID).pipe(
      tap((res: PaymentListNewPayment) => {
        console.log("PaymentListNewPayment", res);
        this.paymentListNewPayment = res;
      })
    );
  }

  update(id: String, body:any): Observable<PaymentListNewPayment> {
    let urlFlight = this.url + id + '/'
    return this.http.put<PaymentListNewPayment>(urlFlight, body).pipe(
      tap((res) => {
        console.log('PaymentListNewPayment', res)
      })
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("PaymentListNewPayment", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<PaymentListNewPayment[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<PaymentListNewPayment[]>(urlFilter).pipe(
      tap((res) => {
        console.log("PaymentListNewPayment", res);
      })
    );
  }
}
