import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Payment } from './payment.model';

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  // url: string = environment.baseUrl + "v1/payments/";  
  url: string = "http://127.0.0.1:8000/v1/payments/";

  // Data
  public payment: Payment
  public payments: Payment[] = []

  constructor(private http: HttpClient) {}

  approve(body): Observable<Payment> {
    return this.http.patch<any>(this.url + "approve/", body).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }

  online(body): Observable<Payment> {
    return this.http.post<any>(this.url + "online/", body).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }

  manual(body): Observable<Payment> {
    return this.http.post<any>(this.url + "manual/", body).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }

  getFiltered(body): Observable<any> {
    return this.http.post<any>(this.url + "getFilteredCID/", body).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }


  get(): Observable<Payment[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("Payment", res);
        this.payments = res;
      })
    );
  }

  getOne(id: string): Observable<Payment> {
    let urlID = this.url + id + "/";
    return this.http.get<Payment>(urlID).pipe(
      tap((res: Payment) => {
        console.log("Payment", res);
        this.payment = res;
      })
    );
  }

  update(id: string, body: Form): Observable<Payment> {
    return this.http.patch<Payment>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<Payment[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<Payment[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Payment", res);
      })
    );
  }
}
