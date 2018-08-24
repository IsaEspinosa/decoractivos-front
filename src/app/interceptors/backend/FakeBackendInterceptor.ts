import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs/index';
import {delay} from "rxjs/operators";
import {chain} from 'lodash'


/**
 * Created by garusis on 8/06/18.
 */
export abstract class FakeBackendInterceptor implements HttpInterceptor {

  protected abstract requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const observable: Observable<HttpEvent<any>> = this.requestInterceptor(request, next);
    return observable ? observable.pipe(delay(500)) : next.handle(request);
  }

  static find(list, field, value) {
    return list.find((item) => item[field] === parseInt(value))
  }

  static filterList(list, query: HttpParams) {
    const where = query.get('where') || {};
    const page: number = <any>query.get('page') || 1;
    const limit: number = <any>query.get('limit') || list.length;
    const offset: number = (page - 1) * limit;

    return chain(list)
      .filter(where)
      .slice(offset, offset + limit)
      .value()
  }
}
