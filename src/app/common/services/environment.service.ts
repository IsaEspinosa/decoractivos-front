import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Environment} from "../models/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvironmentType} from "../models/environment-type";
import {QueryRequest} from "../models/query-request";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  static apiEnvironmentResource: string = `${environment.apiUrl}/environments`;
  static apiEnvironmentTypeResource: string = `${environment.apiUrl}/environment_types`;

  constructor(private http: HttpClient) {
  }

  getList(query = {}): Observable<Array<Environment>> {
    return this.http.get<Array<Environment>>(EnvironmentService.apiEnvironmentResource, {params: query});
  }

  getTypes(): Observable<Array<EnvironmentType>> {
    return this.http.get<Array<EnvironmentType>>(EnvironmentService.apiEnvironmentTypeResource);
  }

}
