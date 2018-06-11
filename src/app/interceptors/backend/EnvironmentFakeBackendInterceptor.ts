import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {delay} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {FakeBackendInterceptor} from "./FakeBackendInterceptor";
import {Observable} from "rxjs";
import {environmentList} from "../../common/mocks/environments";


/**
 * Created by garusis on 8/06/18.
 */
export class EnvironmentFakeBackendInterceptor extends FakeBackendInterceptor {

  private environmentList = environmentList;
  private requestPath: string = "\\/api\\/\\d+\\.\\d+\\.\\d+\\/environments";


  protected requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!new RegExp(`${this.requestPath}($|\/)`).test(request.url)) {
      return null;
    }

    if (new RegExp(`${this.requestPath}($|\/)`) && request.method === 'GET') {
      return of(new HttpResponse({status: 200, body: this.environmentList}))
    }
  }

}
