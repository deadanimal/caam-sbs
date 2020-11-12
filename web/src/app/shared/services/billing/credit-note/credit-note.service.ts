import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreditNote } from './credit-note.model';

@Injectable({
  providedIn: "root",
})
export class CreditNoteService {
  url: string = environment.baseUrl + "v1/credit-note/";

  // Data
  public creditNote: CreditNote
  public creditNotes: CreditNote[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<CreditNote> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("CreditNote", res);
      })
    );
  }

  get(): Observable<CreditNote[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("CreditNote", res);
        this.creditNotes = res;
      })
    );
  }

  getOne(id: string): Observable<CreditNote> {
    let urlID = this.url + id + "/";
    return this.http.get<CreditNote>(urlID).pipe(
      tap((res: CreditNote) => {
        console.log("CreditNote", res);
        this.creditNote = res;
      })
    );
  }

  update(id: string, body: Form): Observable<CreditNote> {
    return this.http.patch<CreditNote>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("CreditNote", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("CreditNote", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<CreditNote[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<CreditNote[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CreditNote", res);
      })
    );
  }
}
