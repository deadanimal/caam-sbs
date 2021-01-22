import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { DebitNote } from './debit-note.model';

@Injectable({
  providedIn: "root",
})
export class DebitNoteService {
  url: string = environment.baseUrl + "v1/debit-note/";

  // Data
  public debitNote: DebitNote
  public debitNotes: DebitNote[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<DebitNote> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("DebitNote", res);
      })
    );
  }

  get(): Observable<DebitNote[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("DebitNote", res);
        this.debitNotes = res;
      })
    );
  }

  getOne(id: string): Observable<DebitNote> {
    let urlID = this.url + id + "/";
    return this.http.get<DebitNote>(urlID).pipe(
      tap((res: DebitNote) => {
        console.log("DebitNote", res);
        this.debitNote = res;
      })
    );
  }

  update(id: string, body: Form): Observable<DebitNote> {
    return this.http.patch<DebitNote>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("DebitNote", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("DebitNote", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<DebitNote[]> {
    let urlFilter = this.url + "?by=" + byfield + "&field=" + field;
    return this.http.get<DebitNote[]>(urlFilter).pipe(
      tap((res) => {
        console.log("DebitNote", res);
      })
    );
  }
}
