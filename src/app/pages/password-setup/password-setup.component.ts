import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { FormService } from "../../common/services/forms.service";
import { UserService } from "../../common/services/user.service";
import { Router } from "@angular/router";
import { AuthService } from "../../common/services/auth.service";

@Component({
  selector: "app-password-setup-page",
  templateUrl: "./password-setup.component.html",
  styleUrls: ["./password-setup.component.scss"]
})
export class PasswordSetupComponent implements OnInit {
  public userForm: FormGroup;
  public isLoading = false;
  public submitted = false;
  public fs: FormService;

  constructor(
    protected userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      password_confirm: [
        null,
        [
          Validators.required,
          (control: FormControl) => this.validateMatchPassword(control)
        ]
      ]
    });

    this.fs = new FormService(this.userForm, this);
  }

  validateMatchPassword(control: FormControl) {
    if (control.root === control) return null;
    // @ts-ignore
    if (control.root.controls.password.value === control.value) return null;
    return { match: true };
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.userForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append("password", this.userForm.get("password").value);

    return this.userService
      .putCurrent(input)
      .toPromise()
      .then(userLogin => {
        this.userService.processLogin(userLogin);
        this.authService.redirectMain();
      })
      .catch(response => this.fs.manageErrors(response));
  }
}

export const PassworSetupInternalComponents = [PasswordSetupComponent];
