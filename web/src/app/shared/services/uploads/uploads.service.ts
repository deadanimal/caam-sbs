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
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data",
    });
    let options = { headers: headers };
    return this.http.post<any>(this.url, body, options).pipe(
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

  update(id: string, body: Form): Observable<UploadsModel> {
    return this.http.patch<UploadsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("UploadsModel", res);
      })
    );
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
}
