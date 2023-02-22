import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {LoginUser} from "../../models/app-user";
import { MatDialog } from '@angular/material/dialog';
import {LoginSuccessDialogComponent} from "../login-success-dialog/login-success-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiData: any = "";
  loginUser: LoginUser = new LoginUser()
  loginSuccess = false;
  constructor(public loginService: LoginService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    if (this.loginSuccess) {
      const dialogRef = this.dialog.open(LoginSuccessDialogComponent);
    }
  }
  openLoginSuccessDialog(): void {
    const dialogRef = this.dialog.open(LoginSuccessDialogComponent, {
      width: '400px',
      disableClose: false
    })
  }
  login(): void {
    this.loginService.login(this.loginUser)
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.loginSuccess = true;
          this.openLoginSuccessDialog();
          if (this.loginSuccess) {
            this.router.navigate(['/not-found']);
          }
        } else {
          this.apiData = "*Credential Invalid"
          console.log("Login failed");
        }
      });
  }
}
