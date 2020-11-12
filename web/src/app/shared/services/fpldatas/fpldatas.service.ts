import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FpldatasModel } from "./fpldatas.model";

@Injectable({
  providedIn: "root",
})
export class FpldatasService {
  url: string = environment.baseUrl + "v1/fpldatas/";

  // Data
  public fpldmodels: FpldatasModel[] = [];
  public fpldmodel: FpldatasModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<FpldatasModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("FpldatasModel", res);
      })
    );
  }

  get(): Observable<FpldatasModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("FpldatasModel", res);
        this.fpldmodels = res;
      })
    );
  }

  getOne(id: string): Observable<FpldatasModel> {
    let urlID = this.url + id + "/";
    return this.http.get<FpldatasModel>(urlID).pipe(
      tap((res: FpldatasModel) => {
        console.log("FpldatasModel", res);
        this.fpldmodel = res;
      })
    );
  }

  // update(id: string, body: Form): Observable<FpldatasModel> {
  //   let url = this.url + "data_put/";
  //   return this.http.post<any>(url, body).pipe(
  //     tap((res) => {
  //       console.log("FpldatasModel", res);
  //     })
  //   );
  // }

  update(id: String, body:any): Observable<FpldatasModel> {
    let urlFlight = this.url + id + '/'
    return this.http.put<FpldatasModel>(urlFlight, body).pipe(
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

  filter(field: string): Observable<FpldatasModel[]> {
    let urlFilter = this.url + "file_filter/?" + field;
    return this.http.get<FpldatasModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FpldatasModel", res);
      })
    );
  }

  // To be submitted by Operation or Airport
  submit(body): Observable<any> {
    let url = this.url + "submit/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }

  // To be checked by Operation
  check(body): Observable<any> {
    let url = this.url + "check/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }

  // To be approved by HOD
  approve(body): Observable<any> {
    let url = this.url + "approve/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }

  // To get list of company with total amount of charged
  invoice(): Observable<any> {
    let url = this.url + "invoice/";
    return this.http.get<any>(url).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }

  // To generate invoice by HOD
  generate(body): Observable<any> {
    let url = this.url + "generate/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("FpldatasModel", res);
      })
    );
  }
}
