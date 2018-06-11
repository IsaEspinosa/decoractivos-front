import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs/index';
import {delay} from "rxjs/operators";


/**
 * Created by garusis on 8/06/18.
 */
export abstract class FakeBackendInterceptor implements HttpInterceptor {

  protected abstract requestInterceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const observable: Observable<HttpEvent<any>> = this.requestInterceptor(request, next);
    return observable ? observable.pipe(delay(500)) : next.handle(request);
  }
}
