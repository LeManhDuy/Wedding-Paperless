import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { CodeStorageService } from 'src/app/_services/code-storage.service';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotEmail: string | undefined
  isLoading: boolean = false;

  constructor
  (
    private alertService: AlertService,
    public forgotpasswordService: ForgotPasswordService,
    private router: Router,
    private codeStorageService: CodeStorageService) {
  }
  GetVerifyCode(): void{
    this.isLoading = true;
    this.forgotpasswordService.getVerifyCode(this.forgotEmail)
    .subscribe(_ =>{
      this.isLoading = false;
      this.alertService.setAlertModel("success","Get code from your email")
       this.router.navigate(['forgotPassword/confirmVerifyCode']);
    },
    (errorMsg: any) => {
      this.isLoading = false;
      this.alertService.setAlertModel("danger","Some thing went wrong")
      console.log(errorMsg)
    })

  }
}
