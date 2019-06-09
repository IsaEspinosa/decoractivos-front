import { Component, OnInit } from "@angular/core";
import { catchError, map } from "rxjs/internal/operators";
import { UserService } from "../../common/services/user.service";
import { SystemUser } from "../../common/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../../common/services/forms.service";
import { AuthService } from "../../common/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: SystemUser = new SystemUser();
  public fs: FormService;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //this.fs = new FormService(this.formLogin, this)
  }

  loginError(error) {
    console.log(error);
  }

  login() {
    //this.fs.markFormGroupTouched();
    this.userService
      .login({ username: this.user.username, password: this.user.password })
      .subscribe(() => {
        this.route.queryParams.subscribe((params: any) => {
          if (params.redirect_url) {
            this.router.navigate([params.redirect_url]);
          } else {
            this.authService.redirectMain();
          }
        });
      }, this.loginError);
  }
}

export const LoginInternalComponents = [LoginComponent];
