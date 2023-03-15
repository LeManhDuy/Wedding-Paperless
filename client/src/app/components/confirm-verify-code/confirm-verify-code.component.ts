import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-confirm-verify-code',
  templateUrl: './confirm-verify-code.component.html',
  styleUrls: ['./confirm-verify-code.component.css']
})
export class ConfirmVerifyCodeComponent {
  errorMessage: string | undefined
  confirmVerifyCode?: number
  isLoading: boolean = false;

  constructor(private alerService: AlertService, public forgotpasswordService: ForgotPasswordService, private router: Router,private codeStorageService: CodeStorageService) {
  }

  ValidateCode(){
    this.isLoading = true;
    this.forgotpasswordService.validateCode(this.confirmVerifyCode?.toString()!)
    .subscribe(respose =>{
      this.isLoading = false;
      this.codeStorageService.assignCode(this.confirmVerifyCode?.toString()!);
      this.alerService.setAlertModel(true,"success","Code is correct");
      this.router.navigate(['/forgotPassword/confirmVerifyCode/resetPassword']);
    },
    (errorMsg: any) => {
      this.isLoading = false;
      this.alerService.setAlertModel(true,"danger","Some thing went wrong");
      console.log(errorMsg)
    })
  }
}
