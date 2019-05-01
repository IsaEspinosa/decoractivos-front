import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Created by garusis on 8/06/18.
 */
@Injectable()
export class ResponseTransformInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
  }
}
