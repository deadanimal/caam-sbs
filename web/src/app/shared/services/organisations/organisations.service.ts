import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { OrganisationsModel } from "./organisations.model";

@Injectable({
  providedIn: "root",
})
export class OrganisationsService {
  url: string = environment.baseUrl + "v1/organisations/";

  // Data
  public omodels: OrganisationsModel[] = [];
  public omodel: OrganisationsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<OrganisationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("OrganisationsModel", res);
      })
    );
  }

  get(): Observable<OrganisationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("OrganisationsModel", res);
        this.omodels = res;
      })
    );
  }

  getOne(id: string): Observable<OrganisationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<OrganisationsModel>(urlID).pipe(
      tap((res: OrganisationsModel) => {
        console.log("OrganisationsModel", res);
        this.omodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<OrganisationsModel> {
    return this.http.patch<OrganisationsModel>(this.url + id + "/", body).pipe(
      tap((res) => {
        console.log("OrganisationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("OrganisationsModel", res);
      })
    );
  }

  filter(field: string): Observable<OrganisationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<OrganisationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("OrganisationsModel", res);
      })
    );
  }
}
