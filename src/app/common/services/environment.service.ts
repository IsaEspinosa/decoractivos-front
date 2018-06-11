import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Environment} from "../models/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  static apiResource: string = `${environment.apiUrl}/environments`;

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Array<Environment>> {
    return this.http.get<Array<Environment>>(EnvironmentService.apiResource);
  }

}
