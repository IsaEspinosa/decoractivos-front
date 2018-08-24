import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        redirect_url: url
      }
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
