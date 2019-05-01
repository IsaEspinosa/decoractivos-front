import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    const routeData: any = route.data;
    const role = routeData.role;
    const requiredRoles = role ? [role] : routeData.roles;

    if (!requiredRoles) return this.redirectMainAndReturn();

    if (requiredRoles.includes('all')) return true;

    if (this.authService.isLoggedIn()) {
      if (requiredRoles.some(role => this.authService.hasRole(role))) {
        return true;
      }
      return this.redirectMainAndReturn();
    }

    if (/^\/login/.test(url)) return true;

    this.authService.redirectLogin(url);
    return false;
  }

  redirectMainAndReturn() {
    this.authService.redirectMain();
    return false;
  }
}
