import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Invoice } from './invoices.model';
import { Posts } from './opost';

@Injectable({
  providedIn: "root",
})
export class InvoicesService {
  url: string = environment.baseUrl + "v1/invoices/";
  // url: string = "http://127.0.0.1:8000/v1/invoices/";

  // Data
  public invoice: Invoice
  public invoices: Invoice[] = []

  constructor(private http: HttpClient) {}

  // post(body): Observable<Invoice> {
  //   return this.http.post<any>(this.url, body).pipe(
  //     tap((res) => {
  //       console.log("Invoice", res);
  //     })
  //   );
  // }

  // display invoice will use this connector
  get(): Observable<Invoice[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("Invoice", res);
        this.invoices = res;
      })
    );
  }

  // get aging
  get_aging(): Observable<Invoice[]> {
    return this.http.get<any>(this.url + "aging/").pipe(
      tap((res)=> {
        console.log("aging", res)
      })
    )
  }

  // generate invoice will use this connector
  post(opost:Posts): Observable<any> {
    return this.http.post(this.url + "generate/", opost)
  }

  // process outstanding invoices
  get_outstanding(): Observable<Invoice[]> {
    return this.http.get<any>(this.url + "check_outstanding/").pipe(
      tap((res) => {
        console.log("Outstanding", res)
      })
    )
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

  exportpdf(body): Observable<any> {
    var HTTPOptions = {
      'responseType': 'blob' as 'json'
    }
    return this.http.post<any>(this.url + "downloadpdf/", body, HTTPOptions);
  }

  getfilteredCID(body): Observable<Invoice> {
    let urlID = this.url + "getfilteredcid/";
    return this.http.post<any>(urlID, body).pipe(
      tap((res) => {
        console.log("Imana", res)
      })
    );
  }
}
