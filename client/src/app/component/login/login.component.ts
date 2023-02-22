import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {LoginUser} from "../../models/app-user";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiData: any = "";
  loginUser: LoginUser = new LoginUser()

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.loginUser)
      .subscribe(response => {
        if (response) {
          console.log(response);
        } else {
          this.apiData = "*Credential Invalid"
          console.log("Login failed");
        }
      });
  }
}
