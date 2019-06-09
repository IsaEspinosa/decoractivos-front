import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User, UserLoginResponse } from "../models/user";
import { map, tap } from "rxjs/internal/operators";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { SnackService } from "./snack.service";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
  static API_USER_RESOURCE = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: SnackService
  ) {
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

  getList(query = {}): Observable<Array<User>> {
    return this.http.get<Array<User>>(UserService.API_USER_RESOURCE, {
      params: this.parseParams(query)
    });
  }

  getCount(where): Observable<any> {
    return this.http.get<any>(`${UserService.API_USER_RESOURCE}/count`, {
      params: this.parseParams(where)
    });
  }

  post(nUser: FormData): Observable<User> {
    return this.http
      .post<User>(UserService.API_USER_RESOURCE, nUser)
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess("El Usuario se ha creado exitosamente")
        )
      );
  }

  putCurrent(nUser: FormData): Observable<User> {
    return this.http
      .post<User>(`${UserService.API_USER_RESOURCE}/current/update`, nUser)
      .pipe(
        tap(() =>
          this.snackBar.snackSuccess(
            "El Usuario se ha actualizado exitosamente"
          )
        )
      );
  }

  login(loginData) {
    return this.http
      .post(`${UserService.API_USER_RESOURCE}/login`, loginData)
      .pipe(
        map((userLogin: UserLoginResponse) => this.processLogin(userLogin))
      );
  }

  processLogin(userLogin) {
    if (!userLogin) return;
    this.authService.accessToken = userLogin.access_token;
    this.authService.currentUser = userLogin.user;
    return userLogin.user;
  }

  logout() {
    this.authService.accessToken = null;
    return of(true);
  }
}
