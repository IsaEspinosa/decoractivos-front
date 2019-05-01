import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User, UserLoginResponse } from '../models/user';
import { map } from 'rxjs/internal/operators';
import { AuthService } from './auth.service';
import { Environment } from '../models/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  static API_USER_RESOURCE = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    this.getCurrentUser(true);
  }

  getCurrentUser(reload): Observable<User> {
    if (reload && this.authService.isLoggedIn()) {
      this.http
        .get<User>(`${UserService.API_USER_RESOURCE}/current`)
        .subscribe((user: User) => (this.authService.currentUser = user));
    }
    return this.authService.currentUser;
  }

  getList(query = {}): Observable<Array<Environment>> {
    return this.http.get<Array<Environment>>(UserService.API_USER_RESOURCE, {
      params: this.parseParams(query)
    });
  }

  getCount(where): Observable<any> {
    return this.http.get<any>(`${UserService.API_USER_RESOURCE}/count`, {
      params: this.parseParams(where)
    });
  }

  login(loginData) {
    return this.http
      .post(`${UserService.API_USER_RESOURCE}/login`, loginData)
      .pipe(
        map((userLogin: UserLoginResponse) => {
          if (!userLogin) return;
          this.authService.accessToken = userLogin.access_token;
          this.authService.currentUser = userLogin.user;
          return userLogin.user;
        })
      );
  }

  logout() {
    this.authService.accessToken = null;
    return of(true);
  }
}
