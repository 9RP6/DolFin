// angular import
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  errFlag: boolean;
  errMsg: string;
  login = {
    "email": "",
    "password": ""
  }

  constructor(
    private authService: AuthService,
    private utilService: UtilsService
  ) {
    this.errFlag = false;
    this.errMsg = "";
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.utilService.redirect_page_to('/default')
    }
  }

  handleSubmit() {
    console.log("entered handleSubmit");
    console.log(this.login);
    
    if (this.login.password.length < 6) {
      this.handleError("Inadequate length of password")
    }
    if (this.errFlag) return;

    let user = this.authService.login(this.login.email, this.login.password)
    if (user) {
      this.utilService.redirect_page_to('/default')
    } else {
      this.handleError("User could not be found!");
    }
    
  }

  handleError(msg: string) {
    console.log("error message: "+msg);
    this.errFlag = true;
    this.errMsg = msg;

    setTimeout(() => {
      this.errFlag = false;
    }, 6000);
  }

}
