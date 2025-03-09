// angular import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { User, UserCreate } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  errMsg: string
  errFlag: boolean
  register: UserCreate

  constructor(
    private authService: AuthService,
    private utilService: UtilsService
  ) {
    this.errMsg = "";
    this.errFlag = false;
    this.register = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: ""
    }
  }

  doRegister() {
    // Validations
    if (this.register.firstName.length <= 0) {
      this.handleError("First Name needs adequate length")
    } else if (this.register.lastName.length <= 0) {
      this.handleError("Last Name needs adequate length")
    } else if (this.register.email.length <= 5) {
      this.handleError("Email needs adequate length")
    } else if (this.register.password.length <= 5) {
      this.handleError("Password needs adequate length")
    }

    if (this.errFlag) return;

    let newUser = this.authService.register(this.register)
    console.log(newUser);
    if (newUser.err != "") {
      this.utilService.redirect_page_to("/default")
    } else {
      this.handleError(newUser.err)
    }
  }

  handleError(msg: string) {
    console.log("Error printed: " + msg);
    this.errMsg = msg
    this.errFlag = true;
    setTimeout(() => {
      this.errFlag = false;
    }, 5000);
  }
}
