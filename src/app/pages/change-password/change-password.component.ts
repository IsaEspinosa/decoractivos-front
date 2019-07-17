import { Component, OnInit } from '@angular/core';
import {ResetPassword, SystemUser} from "../../common/models/user";
import {FormService} from "../../common/services/forms.service";
import {UserService} from "../../common/services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public user: ResetPassword = new ResetPassword();
  public fs: FormService;
  public message: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  showError(error) {
    console.log(error);
  }
  changePassword() {
    console.log("enviando token al email");
    if ( this.user.password1 !== this.user.password2) {
      console.log('la contraseña no es igual');
      return;
    }
    this.userService
      .forgotPassword({ email: this.user.password1})
      .subscribe((data) => {
        console.log(data);
        this.message = data.message;
      }, this.showError);

  }
}
