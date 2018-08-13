import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {of} from "rxjs/internal/observable/of";
import {FakeBackendInterceptor} from "./FakeBackendInterceptor";
import {Observable} from "rxjs";
import {environmentTypeList} from "../../common/mocks/environment_types";


/**
 * Created by garusis on 8/06/18.
 */
export class EnvironmentTypeFakeBackendInterceptor extends FakeBackendInterceptor {

  private environmentTypeList = environmentTypeList;
  private requestPath: string = "\\/api\\/\\d+\\.\\d+\\.\\d+\\/environment_types";


  protected requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!new RegExp(`${this.requestPath}($|\/)`).test(request.url)) {
      return null;
    }

    if (new RegExp(`${this.requestPath}($|\/)`) && request.method === 'GET') {
      return of(new HttpResponse({status: 200, body: this.environmentTypeList}))
    }
  }

}
