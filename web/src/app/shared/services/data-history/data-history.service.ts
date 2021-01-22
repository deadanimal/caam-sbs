import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FpldatasHistoryModel } from "./data-history.model";

@Injectable({
  providedIn: "root",
})
export class FpldatasHistoryService {
  url: string = environment.baseUrl + "v1/fpldatas-history/";

  // Data
  public fpldatasHistoryModels: FpldatasHistoryModel[] = [];
  public fpldatasHistoryModel: FpldatasHistoryModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<FpldatasHistoryModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("FpldatasHistoryModel", res);
      })
    );
  }

  get(): Observable<FpldatasHistoryModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("FpldatasHistoryModel", res);
        this.fpldatasHistoryModels = res;
      })
    );
  }

  getOne(id: string): Observable<FpldatasHistoryModel> {
    let urlID = this.url + id + "/";
    return this.http.get<FpldatasHistoryModel>(urlID).pipe(
      tap((res: FpldatasHistoryModel) => {
        console.log("FpldatasModel", res);
        this.fpldatasHistoryModel = res;
      })
    );
  }

  // update(id: string, body: Form): Observable<FpldatasModel> {
  //   return this.http.patch<FpldatasModel>(this.url + id + "/", body).pipe(
  //     tap((res) => {
  //       console.log("FpldatasModel", res);
  //     })
  //   );
  // }

  update(id: String, body): Observable<FpldatasHistoryModel> {
    let urlFlight = this.url + id + '/'
    return this.http.put<FpldatasHistoryModel>(urlFlight, body).pipe(
      tap((res) => {
        console.log('FpldatasModel', res)
      })
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("FpldatasModel", res);
      })
    );
  }

  filter(field: string): Observable<FpldatasHistoryModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FpldatasHistoryModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FpldatasModel", res);
      })
    );
  }

  // To add data into history
  add_history(body: Form): Observable<any> {
    let url = this.url + "add_history/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }

}
