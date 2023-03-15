import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/app-user';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';
import { Location } from '@angular/common'
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string | undefined
  resetPassword: ResetPassword = new ResetPassword();
  isLoading: boolean = false;

  constructor(private alerService: AlertService, private _location: Location,public forgotpasswordService: ForgotPasswordService, private router: Router,private codeStorageService: CodeStorageService) {
  }

  ResetPassword(){
    const verifycode = this.codeStorageService.verifycode;
    if(!verifycode){
      this.alerService.setAlertModel(true,"danger","Verify code is null")
      setTimeout(() =>{ this._location.back()} ,500)
      return;
    }
    this.isLoading = true;
    this.resetPassword.code = verifycode;
    this.forgotpasswordService.resetPassword(this.resetPassword)
    .subscribe(_ => {
      this.isLoading = false;
      this.alerService.setAlertModel(true,"success","Change password successfully")
        this.router.navigate(['/login']);
    },
    (errorMsg: any) => {
      this.errorMessage = errorMsg;
      this.alerService.setAlertModel(true,"success","Some thing went wrong")
      this.isLoading = false;
      console.log(errorMsg)
    }
    )

  }


}
