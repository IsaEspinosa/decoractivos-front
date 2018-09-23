import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../common/services/auth.service";
import {Injectable} from "@angular/core";


/**
 * Created by garusis on 8/06/18.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.isLoggedIn()) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authService.accessToken}`)
    });

    return next.handle(authReq);
  }
}
