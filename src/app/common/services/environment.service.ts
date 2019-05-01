import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Environment } from '../models/environment';
import { EnvironmentType } from '../models/environment-type';
import { Layer } from '../models/layer';
import { BaseService } from './base.service';
import { SnackService } from './snack.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService extends BaseService {
  static API_ENVIRONMENT_RESOURCE = `${environment.apiUrl}/environments`;
  static API_ENVIRONMENT_TYPE_RESOURCE = `${
    environment.apiUrl
  }/environment_types`;

  constructor(private http: HttpClient, private snackBar: SnackService) {
    super();
  }

  extractIdFromSlug(slug: string) {
    return slug.replace(/^[a-zA-ZñÑ\-\d]+\-(\d+)$/, '$1');
  }

  getList(query = {}): Observable<Array<Environment>> {
    return this.http.get<Array<Environment>>(
      EnvironmentService.API_ENVIRONMENT_RESOURCE,
      {
        params: this.parseParams(query)
      }
    );
  }

  post(nEnvironment: FormData): Observable<Environment> {
    return this.http
      .post<Environment>(
        EnvironmentService.API_ENVIRONMENT_RESOURCE,
        nEnvironment
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('El Ambiente se ha creado exitosamente')
        )
      );
  }

  put(environment_id, nEnvironment: FormData): Observable<Environment> {
    return this.http
      .post<Environment>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/update`,
        nEnvironment
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess(
            'El Ambiente se ha actualizado exitosamente'
          )
        )
      );
  }

  getOne(environment_id) {
    return this.http.get<Environment>(
      `${EnvironmentService.API_ENVIRONMENT_RESOURCE}/${environment_id}`
    );
  }

  getLayers(environment_id) {
    return this.http.get<Array<Layer>>(
      `${EnvironmentService.API_ENVIRONMENT_RESOURCE}/${environment_id}/layers`
    );
  }

  postLayer(environment_id, layer: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers`,
        layer
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('La Capa se ha creado exitosamente')
        )
      );
  }

  reorderLayers(environment_id, layers: any): Observable<Array<Layer>> {
    return this.http.post<Array<Layer>>(
      `${
        EnvironmentService.API_ENVIRONMENT_RESOURCE
      }/${environment_id}/layers/reorder`,
      { layers }
    );
  }

  putLayer(environment_id, layer_id, layer: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/update`,
        layer
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('La Capa se ha actualizado exitosamente')
        )
      );
  }

  removeLayer(environment_id, layer_id) {
    return this.http
      .delete<Array<Layer>>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}`
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('La Capa se ha eliminado exitosamente')
        )
      );
  }

  postCategory(environment_id, layer_id, type: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/categories`,
        type
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('La Categoria se ha creado exitosamente.')
        )
      );
  }

  putCategory(environment_id, layer_id, category_id, category: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/categories/${category_id}/update`,
        category
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess(
            'La Categoria ha sido actualizada exitosamente.'
          )
        )
      );
  }

  deleteCategory(environment_id, layer_id, category_id) {
    return this.http
      .delete<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/categories/${category_id}`
      )
      .pipe(
        tap(() => this.snackBar.snackSuccess('La Categoria ha sido eliminada.'))
      );
  }

  postItem(environment_id, layer_id, type: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/items`,
        type
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('El Producto se ha creado exitosamente.')
        )
      );
  }

  putItem(environment_id, layer_id, item_id, type: FormData) {
    return this.http
      .post<Layer>(
        `${
          EnvironmentService.API_ENVIRONMENT_RESOURCE
        }/${environment_id}/layers/${layer_id}/items/${item_id}/update`,
        type
      )
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess('El Producto se ha creado exitosamente.')
        )
      );
  }

  getTypes(query = {}): Observable<Array<EnvironmentType>> {
    return this.http.get<Array<EnvironmentType>>(
      EnvironmentService.API_ENVIRONMENT_TYPE_RESOURCE,
      {
        params: this.parseParams(query)
      }
    );
  }

  postType(type: FormData) {
    return this.http.post<EnvironmentType>(
      EnvironmentService.API_ENVIRONMENT_TYPE_RESOURCE,
      type
    );
  }
}
