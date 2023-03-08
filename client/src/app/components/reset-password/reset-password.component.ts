import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/app-user';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string | undefined
  resetPassword: ResetPassword = new ResetPassword();

  constructor(public forgotpasswordService: ForgotPasswordService, private router: Router,private codeStorageService: CodeStorageService) {
  }

  ResetPassword(){
    const verifycode = this.codeStorageService.verifycode;
    if(!verifycode){
      this.errorMessage = 'verify code is not valid';
      return;
    }
    this.resetPassword.code = verifycode;
    this.forgotpasswordService.resetPassword(this.resetPassword)
    .subscribe(_ => {
        this.router.navigate(['/login']);
    })

  }
}
