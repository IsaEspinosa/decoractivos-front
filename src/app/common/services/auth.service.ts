import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from "rxjs";
import {authTokenKey} from "../constants";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string = localStorage[authTokenKey] || null;
  private _currentUser: Subject<User> = new Subject();

  constructor() {
  }

  get currentUser() {
    return this._currentUser.asObservable()
  }

  set currentUser(user: any) {
    this._currentUser.next(user)
  }

  get accessToken() {
    return this._token
  }

  set accessToken(token: string) {
    if (token) {
      localStorage[authTokenKey] = this._token = token
    } else {
      delete localStorage[authTokenKey]
      this.currentUser = null
    }
  }

  isLoggedIn(): boolean {
    return !!this.accessToken
  }
}
