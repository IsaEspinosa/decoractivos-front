import {Component, OnInit} from '@angular/core';
import {catchError, map} from "rxjs/internal/operators";
import {UserService} from "../../common/services/user.service";
import {SystemUser} from "../../common/models/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: SystemUser = new SystemUser();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  loginError(error) {
    console.log(error)
  }

  login() {
    this.userService
      .login({username: this.user.username, password: this.user.password})
      .subscribe(
        () => {
          throw new Error()
          // @ts-ignore
          this.route
            .queryParams
            //.subscribe((params: any) => this.router.navigate([params.redirect_url]));
        },
        this.loginError
      )
  }

}

export const LoginInternalComponents = [
  LoginComponent
];
