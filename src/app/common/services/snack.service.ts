import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { ErrorSnackComponent } from "../components/error-snack/error-snack.component";
import { SuccessSnackComponent } from "../components/success-snack/success-snack.component";

@Injectable({
  providedIn: "root"
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  snackError(
    err: any,
    message = "Un error interno ha ocurrido.<br/>Por favor intentelo nuevamente en unos segundos.",
    config = {}
  ) {
    this.snackBar.openFromComponent(ErrorSnackComponent, {
      duration: 6000,
      data: message,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: "error-snack",
      ...config
    });
    console.log(err.message);
  }

  snackSuccess(message = "Operacion Exitosa", config = {}) {
    this.snackBar.openFromComponent(SuccessSnackComponent, {
      duration: 6000,
      data: message,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: "success-snack",
      ...config
    });
  }
}
