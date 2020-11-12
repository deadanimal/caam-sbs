import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { UploadsModel } from "./uploads.model";

@Injectable({
  providedIn: "root",
})
export class UploadsService {
  url: string = environment.baseUrl + "v1/file-uploads/";

  // Data
  public umodels: UploadsModel[] = [];
  public umodel: UploadsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<UploadsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
  }

  get(): Observable<UploadsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
        this.umodels = res;
      })
    );
  }

  getOne(id: string): Observable<UploadsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<UploadsModel>(urlID).pipe(
      tap((res: UploadsModel) => {
        console.log("UploadsModel", res);
        this.umodel = res;
      })
    );
  }

  // update(id: string, body: Form): Observable<UploadsModel> {
  //   return this.http.patch<UploadsModel>(this.url + id + "/", body).pipe(
  //     tap((res) => {
  //       console.log("UploadsModel", res);
  //     })
  //   );
  // }

  update(id: String, body:any): Observable<UploadsModel> {
    let urlFlight = this.url + id + '/'
    return this.http.put<UploadsModel>(urlFlight, body).pipe(
      tap((res) => {
        console.log('UploadsModel', res)
      })
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
  }

  filter(field: string): Observable<UploadsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<UploadsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
  }

  filterByField(byfield: string, field: string): Observable<UploadsModel[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<UploadsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
  }

  upload(body): Observable<any> {
    let url = this.url + "upload/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("UploadsModel", res);
      })
    );
  }

  extended(field: string): Observable<UploadsModel[]> {
    let urlExtended = this.url + "extended/?" + field;
    return this.http.get<UploadsModel[]>(urlExtended).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
  }

  statuses() {
    return [
      { value: "FIL0", name: "Draf" },
      { value: "FIL1", name: "Processing" },
      { value: "FIL2", name: "Checked" },
      { value: "FIL3", name: "Approved" },
    ];
  }
}
