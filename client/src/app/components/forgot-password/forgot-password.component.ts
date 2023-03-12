import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  errorMessage: string =""
  forgotEmail: string | undefined
  isLoading: boolean = false;

  constructor
  (
    public forgotpasswordService: ForgotPasswordService,
    private router: Router,
    private codeStorageService: CodeStorageService) {
  }
  GetVerifyCode(): void{
    this.isLoading = true;
    this.forgotpasswordService.getVerifyCode(this.forgotEmail)
    .subscribe(_ =>{
      this.isLoading = false;
       this.router.navigate(['forgotPassword/confirmVerifyCode']);
    },
    (errorMsg: any) => {
      this.isLoading = false;
      this.errorMessage =errorMsg;
      console.log(errorMsg)
    })

  }
}
