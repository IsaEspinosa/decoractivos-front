import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Location} from '@angular/common';
import {AuthService} from "../common/services/auth.service";
import {Injectable} from "@angular/core";
import {throwError, of} from 'rxjs';
import {catchError} from "rxjs/operators";


/**
 * Created by garusis on 8/06/18.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private location: Location) {
  }

  interceptResponse(next, req) {

    //noinspection TypeScriptValidateTypes
    return next.handle(req)
      .pipe(
        catchError(response => {
          if (response.status === 401) {
            this.authService.redirectLogin(this.location.path())
          }
          return throwError(response);
        })
      )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.isLoggedIn()) {
      return this.interceptResponse(next, req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authService.accessToken}`)
    });

    return this.interceptResponse(next, authReq);
  }
}
