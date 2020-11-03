import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreditDebit } from './credit-and-debit.model';

@Injectable({
  providedIn: "root",
})
export class CreditDebitService {
  url: string = environment.baseUrl + "v1/credit-debit/";

  // Data
  public creditDebit: CreditDebit
  public creditDebits: CreditDebit[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<CreditDebit> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("CreditDebit", res);
      })
    );
  }

  get(): Observable<CreditDebit[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("CreditDebit", res);
        this.creditDebits = res;
      })
    );
  }

  getOne(id: string): Observable<CreditDebit> {
    let urlID = this.url + id + "/";
    return this.http.get<CreditDebit>(urlID).pipe(
      tap((res: CreditDebit) => {
        console.log("CreditDebit", res);
        this.creditDebit = res;
      })
    );
  }

  update(id: string, body: Form): Observable<CreditDebit> {
    return this.http.patch<CreditDebit>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("CreditDebit", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("CreditDebit", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<CreditDebit[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<CreditDebit[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CreditDebit", res);
      })
    );
  }
}
