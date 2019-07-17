import { Component, OnInit } from "@angular/core";
import {SystemUser} from "../../common/models/user";
import {FormService} from "../../common/services/forms.service";
import {UserService} from "../../common/services/user.service";
import {AuthService} from "../../common/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  public user: SystemUser = new SystemUser();
  public fs: FormService;
  public message: string;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
  }
  showError(error) {
    console.log(error);
  }
  sendEmail() {
    console.log("enviando token al email");
    this.userService
      .forgotPassword({ email: this.user.email})
      .subscribe((data) => {
        console.log(data);
        this.message = data.message;
      }, this.showError);

  }

}
