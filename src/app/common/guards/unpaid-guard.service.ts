import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UnpaidGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return false;
  }

  redirectMainAndReturn() {
    this.authService.redirectMain();
    return false;
  }
}
