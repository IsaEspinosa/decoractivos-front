import io from "socket.io-client";
import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { NavigationExtras, Router } from "@angular/router";
import { authTokenKey, roleKey } from "../constants";
import { User } from "../models/user";
import { environment } from "../../../environments/environment";

const authErrors = ["max-session-user"];

@Injectable({
  providedIn: "root"
})
export class AuthService {
  static API_SOCKET_RESOURCE = `${environment.apiUrl}`;
  private _token: string;
  private _roles = JSON.parse(localStorage[roleKey] || '["guest"]');
  private _currentUser: Subject<User> = new Subject();
  private pendingLogin = false;
  private socket;

  constructor(private router: Router) {
    this.accessToken = localStorage[authTokenKey] || null;
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
    return localStorage[authTokenKey];
  }

  set accessToken(token: string) {
    if (token) {
      this.pendingLogin = false;
      localStorage[authTokenKey] = this._token = token;
      this.initSocket();
    } else {
      delete localStorage[authTokenKey];
      this.roles = ["guest"];
      this.currentUser = null;
      if (this.socket) this.socket.close();
    }
  }

  initSocket() {
    this.socket = io(`${AuthService.API_SOCKET_RESOURCE}?token=${this._token}`);

    this.socket.on("error", error => {
      if (authErrors.includes(error)) {
        this.accessToken = null;
        this.redirectLogin("/");
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  redirectLogin(redirect_url) {
    if (this.pendingLogin) return;

    this.pendingLogin = true;
    const navigationExtras: NavigationExtras = {
      queryParams: /\/usuarios\/\w*-contrasena\?/.test(redirect_url)
        ? {}
        : { redirect_url }
    };

    this.accessToken = null;
    this.router.navigate(["/login"], navigationExtras);
  }

  redirectMain() {
    if (this.roles.includes("client")) {
      this.router.navigate(["/ambientes"]);
    } else if (this.roles.includes("admin")) {
      this.router.navigate(["/admin"]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  hasRole(role) {
    return this.roles.includes(role);
  }
}
