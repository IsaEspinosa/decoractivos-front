import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {MatSnackBar} from '@angular/material';
import {ErrorSnackComponent} from '../common/components/error-snack/error-snack.component';


/**
 * Created by garusis on 8/06/18.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError(response => {
          if (response.status === 500) {
            this.snackBar.openFromComponent(ErrorSnackComponent, {
              duration: 6000,
              data: 'Un error interno ha ocurrido.<br/>Por favor intentelo nuevamente en unos segundos.',
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              panelClass: 'error-snack'
            });
            console.log(response);
          }
          return throwError(response);
        })
      );
  }
}
