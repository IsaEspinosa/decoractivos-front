import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';
import {authTokenKey, roleKey} from '../constants';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string = localStorage[authTokenKey] || null;
  private _roles = JSON.parse(localStorage[roleKey] || '["guest"]');
  private _currentUser: Subject<User> = new Subject();
  private pendingLogin = false;

  constructor(private router: Router) {
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  set currentUser(user: any) {
    if (user) {
      this.roles = user.roles.map(role => role.identifier);
    }
    this._currentUser.next(user);
  }

  get roles() {
    return this._roles;
  }

  set roles(roles) {
    this._roles = roles;
    localStorage[roleKey] = JSON.stringify(roles);
  }

  get accessToken() {
    return this._token;
  }

  set accessToken(token: string) {
    if (token) {
      this.pendingLogin = false;
      localStorage[authTokenKey] = this._token = token;
    } else {
      delete localStorage[authTokenKey];
      this.roles = ['guest'];
      this.currentUser = null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  redirectLogin(redirect_url) {
    if (this.pendingLogin) return;

    this.pendingLogin = true;
    const navigationExtras: NavigationExtras = {
      queryParams: {redirect_url}
    };

    this.accessToken = null;
    this.router.navigate(['/login'], navigationExtras);
  }

  redirectMain() {
    if (this.roles.includes('client')) {
      this.router.navigate(['/ambientes']);
    } else if (this.roles.includes('admin')) {
      this.router.navigate(['/admin/ambientes']);
    } else {
      this.router.navigate(['/']);
    }
  }

  hasRole(role) {
    return this.roles.includes(role);
  }
}
