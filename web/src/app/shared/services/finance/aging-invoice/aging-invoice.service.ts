import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AgingInvoice } from './aging-invoice.model';

@Injectable({
  providedIn: "root",
})
export class AgingInvoicesService {
  url: string = environment.baseUrl + "v1/aging-invoices/";

  // Data
  public agingInvoice: AgingInvoice
  public agingInvoices: AgingInvoice[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<AgingInvoice> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AgingInvoice", res);
      })
    );
  }

  get(): Observable<AgingInvoice[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AgingInvoice", res);
        this.agingInvoices = res;
      })
    );
  }

  getOne(id: string): Observable<AgingInvoice> {
    let urlID = this.url + id + "/";
    return this.http.get<AgingInvoice>(urlID).pipe(
      tap((res: AgingInvoice) => {
        console.log("AgingInvoice", res);
        this.agingInvoice = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AgingInvoice> {
    return this.http.patch<AgingInvoice>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("AgingInvoice", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AgingInvoice", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<AgingInvoice[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<AgingInvoice[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AgingInvoice", res);
      })
    );
  }
}
