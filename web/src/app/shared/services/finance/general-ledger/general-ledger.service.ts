import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { GeneralLedger } from './general-ledger.model';

@Injectable({
  providedIn: "root",
})
export class GeneralLedgerService {
  url: string = environment.baseUrl + "v1/general-ledger/";

  // Data
  public generalLedger: GeneralLedger
  public generalLedgers: GeneralLedger[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<GeneralLedger> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("GeneralLedger", res);
      })
    );
  }

  get(): Observable<GeneralLedger[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("GeneralLedger", res);
        this.generalLedgers = res;
      })
    );
  }

  getOne(id: string): Observable<GeneralLedger> {
    let urlID = this.url + id + "/";
    return this.http.get<GeneralLedger>(urlID).pipe(
      tap((res: GeneralLedger) => {
        console.log("GeneralLedger", res);
        this.generalLedger = res;
      })
    );
  }

  update(id: string, body: Form): Observable<GeneralLedger> {
    return this.http.patch<GeneralLedger>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("GeneralLedger", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("GeneralLedger", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<GeneralLedger[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<GeneralLedger[]>(urlFilter).pipe(
      tap((res) => {
        console.log("GeneralLedger", res);
      })
    );
  }
}
