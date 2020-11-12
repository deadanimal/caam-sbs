import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  url: string = environment.baseUrl + "v1/billing-invoice/";

  // Data
  public invoice: Invoice
  public invoices: Invoice[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<Invoice> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("Invoice", res);
      })
    );
  }

  get(): Observable<Invoice[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("Invoice", res);
        this.invoices = res;
      })
    );
  }

  getOne(id: string): Observable<Invoice> {
    let urlID = this.url + id + "/";
    return this.http.get<Invoice>(urlID).pipe(
      tap((res: Invoice) => {
        console.log("Invoice", res);
        this.invoice = res;
      })
    );
  }

  update(id: string, body: Form): Observable<Invoice> {
    return this.http.patch<Invoice>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("Invoice", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("Invoice", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<Invoice[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<Invoice[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Invoice", res);
      })
    );
  }
}
