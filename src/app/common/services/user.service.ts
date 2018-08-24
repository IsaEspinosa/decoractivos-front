import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User, UserLoginResponse} from "../models/user";
import {map} from "rxjs/internal/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static API_USER_RESOURCE: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getCurrentUser(true)
  }

  getCurrentUser(reload): Observable<User> {
    if (reload && this.authService.isLoggedIn()) {
      this.http.get<User>(`${UserService.API_USER_RESOURCE}/current`)
        .subscribe((user: User) => this.authService.currentUser = user)
    }
    return this.authService.currentUser
  }


  login(loginData) {
    return this.http.post(`${UserService.API_USER_RESOURCE}/login`, loginData)
      .pipe(
        map((userLogin: UserLoginResponse) => {
          if (!userLogin) return;

          this.authService.accessToken = userLogin.token
          this.authService.currentUser = userLogin.user
          return userLogin.user
        })
      );
  }

  logout() {
    this.authService.accessToken = null
    return of(true)
  }
}