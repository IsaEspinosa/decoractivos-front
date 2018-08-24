import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs/internal/observable/of";
import {FakeBackendInterceptor} from "./FakeBackendInterceptor";
import {Observable} from "rxjs";
import {environmentList} from "../../common/mocks/environments";
import {Environment} from "../../common/models/environment";


/**
 * Created by garusis on 8/06/18.
 */
export class EnvironmentFakeBackendInterceptor extends FakeBackendInterceptor {

  private environmentList = environmentList;
  private requestPath: string = "\\/api\\/\\d+\\.\\d+\\.\\d+\\/environments";

  private requestList: RegExp = new RegExp(`${this.requestPath}\/{0,1}$`);
  private requestGetOne: RegExp = new RegExp(`${this.requestPath}\/(\\d+)\/{0,1}$`);


  protected requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!new RegExp(`${this.requestPath}($|\/)`).test(request.url)) {
      return null;
    }

    if (this.requestList.test(request.url) && request.method === 'GET') {
      return of(new HttpResponse({
        status: 200,
        body: FakeBackendInterceptor.filterList(this.environmentList, request.params)
      }))
    }

    if (this.requestGetOne.test(request.url) && request.method === 'GET') {
      const id = request.url.replace(this.requestGetOne, "$1").replace(environment.apiDomain, "");
      return of(new HttpResponse({
        status: 200,
        body: FakeBackendInterceptor.find(this.environmentList, 'environment_id', id)
      }))
    }
  }

}
