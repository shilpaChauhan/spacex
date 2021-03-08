import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class LaunchService {
  private url = "https://api.spaceXdata.com/v3/launches?limit=100";

  constructor(private http: HttpClient) { }

  getAllLaunches(): Observable<any> {
    return this.http.get(this.url);
  }

  getFilteredLaunches(param: any): Observable<any> {
    this.url = "https://api.spaceXdata.com/v3/launches?limit=100";
    if (param.year) {
      this.url = `${this.url}&launch_year=${param.year}`;
    }

    if (param.launchStatus) {
      this.url = `${this.url}&launch_success=${param.launchStatus}`;
    }

    if (param.landStatus) {
      this.url = `${this.url}&land_success=${param.landStatus}`;
    }
    return this.http.get(this.url);
  }
}
