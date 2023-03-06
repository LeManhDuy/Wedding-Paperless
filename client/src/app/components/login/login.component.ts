import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../_services/login.service";
import { LoginUser } from "../../models/app-user";
import { MatDialog } from '@angular/material/dialog';
import { LoginSuccessDialogComponent } from "./login-success-dialog/login-success-dialog.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormBuilder, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    RouterModule
  ],
  standalone: true
})
export class LoginComponent implements OnInit {
  apiData: any = "";
  loginUser: LoginUser = new LoginUser()
  loginSuccess = false;

  constructor(
    public loginService: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    if (this.loginService.currentUserValue) {
      const payloadBase64 = this.loginService.currentUserValue.token?.split('.')[1];
      if (payloadBase64) {
        const payloadJson = atob(payloadBase64);
        const payloadObject = JSON.parse(payloadJson);
        const role = payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        if (role == "admin")
          this.router.navigate(['/dashboard-admin'])
        if (role == "user")
          this.router.navigate(['/dashboard-user'])
      }
      
    }
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
        console.log("1");
        if (response) {
          console.log(response);
          this.loginSuccess = true;
          this.openLoginSuccessDialog();
          if (this.loginSuccess) {
            if (response.role == "user")
              this.router.navigate(['/dashboard-user']);
            if (response.role == "admin")
              this.router.navigate([
                '/dashboard-admin'
              ])
          }
        } else {
          this.apiData = "*Credential Invalid"
        }
      });
  }
}
