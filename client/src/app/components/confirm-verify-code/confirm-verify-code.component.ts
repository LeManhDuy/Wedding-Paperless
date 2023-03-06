import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-confirm-verify-code',
  templateUrl: './confirm-verify-code.component.html',
  styleUrls: ['./confirm-verify-code.component.css']
})
export class ConfirmVerifyCodeComponent {
  errorMessage: string | undefined
  confirmVerifyCode: number | undefined

  constructor(public forgotpasswordService: ForgotPasswordService, private router: Router,private codeStorageService: CodeStorageService) {
  }

  ValidateCode(){
    this.forgotpasswordService.validateCode(this.confirmVerifyCode?.toString()!)
    .subscribe(respose =>{
      this.codeStorageService.assignCode(this.confirmVerifyCode?.toString()!);
      this.router.navigate(['/forgotPassword/confirmVerifyCode/resetPassword']);
    })
  }
}
