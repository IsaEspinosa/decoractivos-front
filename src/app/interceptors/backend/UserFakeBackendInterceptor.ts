import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {of} from "rxjs/internal/observable/of";
import {FakeBackendInterceptor} from "./FakeBackendInterceptor";
import {Observable} from "rxjs";
import {userList} from "../../common/mocks/users";
import {find} from 'lodash'

/**
 * Created by garusis on 8/06/18.
 */
export class UserFakeBackendInterceptor extends FakeBackendInterceptor {

  private userList = userList;
  private requestPath: string = "\\/api\\/\\d+\\.\\d+\\.\\d+\\/users";

  protected requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!new RegExp(`${this.requestPath}($|\/)`).test(request.url)) {
      return null;
    }

    if (new RegExp(`${this.requestPath}\/login($|\/)`) && request.method === 'POST') {
      const user = find(this.userList, request.body)
      if (!user) {
        return of(new HttpResponse({status: 401}))
      }

      return of(new HttpResponse({
        status: 200,
        body: {
          token: `${Date.now().toString(16)}_${user.user_id}`,
          user
        }
      }))
    }

    if (new RegExp(`${this.requestPath}\/current($|\/)`) && request.method === 'GET') {
      const user = find(this.userList, request.body)
      if (!user) {
        // @ts-ignore
        return of(new HttpErrorResponse({status: 401}))
      }

      return of(new HttpResponse({
        status: 200,
        body: {
          token: `${Date.now().toString(16)}_${user.user_id}`,
          user
        }
      }))
    }

  }

}
