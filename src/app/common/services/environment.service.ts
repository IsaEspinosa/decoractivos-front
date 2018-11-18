import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Environment} from '../models/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentType} from '../models/environment-type';
import {Layer} from '../models/layer';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService extends BaseService {

  static API_ENVIRONMENT_RESOURCE = `${environment.apiUrl}/environments`;
  static API_ENVIRONMENT_TYPE_RESOURCE = `${environment.apiUrl}/environment_types`;

  constructor(private http: HttpClient) {
    super();
  }

  getList(query = {}): Observable<Array<Environment>> {
    return this.http.get<Array<Environment>>(EnvironmentService.API_ENVIRONMENT_RESOURCE, {params: query});
  }

  getOne(environment_id) {
    return this.http.get<Environment>(`${EnvironmentService.API_ENVIRONMENT_RESOURCE}/${environment_id}`);
  }

  getLayers(environment_id) {
    return this.http.get<Array<Layer>>(`${EnvironmentService.API_ENVIRONMENT_RESOURCE}/${environment_id}/layers`);
  }

  getTypes(query = {}): Observable<Array<EnvironmentType>> {
    return this.http
      .get<Array<EnvironmentType>>(
        EnvironmentService.API_ENVIRONMENT_TYPE_RESOURCE,
        {
          params: this.parseParams(query)
        }
      );
  }

  postType(type: FormData) {
    return this.http.post<EnvironmentType>(EnvironmentService.API_ENVIRONMENT_TYPE_RESOURCE, type);
  }

}
