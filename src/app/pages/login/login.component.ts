import { Component, OnInit } from "@angular/core";
import { catchError, map } from "rxjs/internal/operators";
import { UserService } from "../../common/services/user.service";
import { SystemUser } from "../../common/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../../common/services/forms.service";
import { AuthService } from "../../common/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: SystemUser = new SystemUser();
  public formLogin: FormGroup;
  public isLoading = false;
  public submitted = false;
  public fs: FormService;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.fs = new FormService(this.formLogin, this);
  }

  get f() {
    return this.formLogin.controls;
  }

  loginError(error) {
    if (error.status === 401) {
      this.fs.populateErrorForms({ username: ["invalid"] });
    }
  }

  login() {
    this.fs.markFormGroupTouched();
    this.userService
      .login({ username: this.user.username, password: this.user.password })
      .subscribe(
        () => {
          this.route.queryParams.subscribe((params: any) => {
            if (params.redirect_url) {
              this.router.navigate([params.redirect_url]);
            } else {
              this.authService.redirectMain();
            }
          });
        },
        error => this.loginError(error)
      );
  }
}

export const LoginInternalComponents = [LoginComponent];
