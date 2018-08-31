import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs/internal/observable/of";
import {FakeBackendInterceptor} from "./FakeBackendInterceptor";
import {Observable} from "rxjs";
import {layerList} from "../../common/mocks/layers";


/**
 * Created by garusis on 8/06/18.
 */
export class LayerFakeBackendInterceptor extends FakeBackendInterceptor {

  private layerList = layerList;
  private requestPath: string = "^.*\\/api\\/\\d+\\.\\d+\\.\\d+\\/environments\/(\\d+)\/layers";

  private requestList: RegExp = new RegExp(`${this.requestPath}\/{0,1}$`);


  protected requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url: string = request.url;
    if (!this.requestList.test(url)) {
      return null;
    }

    const environmentId = parseInt(url.replace(this.requestList, "$1"))
    if (this.requestList.test(url) && request.method === 'GET') {
      return of(new HttpResponse({
        status: 200,
        body: FakeBackendInterceptor.filter(this.layerList, {environment_id: environmentId})
      }))
    }
  }

}
