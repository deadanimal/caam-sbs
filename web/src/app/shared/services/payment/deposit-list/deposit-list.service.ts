import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { DepositList } from './deposit-list.model';

@Injectable({
  providedIn: "root",
})
export class DepositListService {
  url: string = environment.baseUrl + "v1/deposits/";

  // Data
  public depositList: DepositList
  public depositLists: DepositList[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<DepositList> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("DepositList", res);
      })
    );
  }

  get(): Observable<DepositList[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("DepositList", res);
        this.depositLists = res;
      })
    );
  }

  getOne(id: string): Observable<DepositList> {
    let urlID = this.url + id + "/";
    return this.http.get<DepositList>(urlID).pipe(
      tap((res: DepositList) => {
        console.log("DepositList", res);
        this.depositList = res;
      })
    );
  }

  update(id: string, body: Form): Observable<DepositList> {
    return this.http.patch<DepositList>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("DepositList", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("DepositList", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<DepositList[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<DepositList[]>(urlFilter).pipe(
      tap((res) => {
        console.log("DepositList", res);
      })
    );
  }
}
