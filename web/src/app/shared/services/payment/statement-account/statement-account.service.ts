import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { StatementAccount } from "./statement-account.model";

@Injectable({
  providedIn: "root",
})
export class StatementAccountService {
  url: string = environment.baseUrl + "v1/statement-account/";

  // Data
  public statementAccounts: StatementAccount[] = [];
  public statementAccount: StatementAccount;

  constructor(private http: HttpClient) {}

  post(body): Observable<StatementAccount> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("StatementAccount", res);
      })
    );
  }

  get(): Observable<StatementAccount[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("StatementAccount", res);
        this.statementAccounts = res;
      })
    );
  }

  getOne(id: string): Observable<StatementAccount> {
    let urlID = this.url + id + "/";
    return this.http.get<StatementAccount>(urlID).pipe(
      tap((res: StatementAccount) => {
        console.log("StatementAccount", res);
        this.statementAccount = res;
      })
    );
  }

  update(id: string, body: Form): Observable<StatementAccount> {
    return this.http.patch<StatementAccount>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("StatementAccount", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("StatementAccount", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<StatementAccount[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<StatementAccount[]>(urlFilter).pipe(
      tap((res) => {
        console.log("StatementAccount", res);
      })
    );
  }
}
