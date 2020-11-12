import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import {FlightData } from './flight-data.model';

@Injectable({
  providedIn: "root",
})



export class FlightDataService {
  url: string = environment.baseUrl + "v1/flight-data/";

  // Data
  public flightData: FlightData
  public flightDatas: FlightData[] = []

  constructor(private http: HttpClient) {}

  post(body): Observable<FlightData> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("FlightData", res);
      })
    );
  }

  get(): Observable<FlightData[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("FlightData", res);
        this.flightDatas = res;
      })
    );
  }

  getOne(id: string): Observable<FlightData> {
    let urlID = this.url + id + "/";
    return this.http.get<FlightData>(urlID).pipe(
      tap((res: FlightData) => {
        console.log("FlightData", res);
        this.flightData = res;
      })
    );
  }

  // update(id: string, body: Form): Observable<FlightData> {
  //   return this.http.patch<FlightData>(this.url + id + "/", body).pipe(
  //     tap((res) => {
  //       console.log("FlightData", res);
  //     })
  //   );
  // }

  update(id: String, body): Observable<FlightData> {
    let urlFlight = this.url + id + '/'
    return this.http.put<FlightData>(urlFlight, body).pipe(
      tap((res) => {
        console.log('FlightData', res)
      })
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("FlightData", res);
      })
    );
  }

  filter(byfield: string, field: string): Observable<FlightData[]> {
    let urlFilter = this.url + "?" + byfield + "=" + field;
    return this.http.get<FlightData[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FlightData", res);
      })
    );
  }
}
