import { RegisterService } from '../../_services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/app-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AlertModel } from 'src/app/models/alertModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser()
  isLoading: boolean = false;
  //registerForm: FormGroup | undefined;

  constructor(private alertService: AlertService, private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const aler : AlertModel ={};
    if (this.registerUser.password !== this.registerUser.confirmpassword) {
      this.alertService.setAlertModel(true,"danger","Password don't match!");
      return;
    }
    this.isLoading = true;
    this.registerService.register(this.registerUser).subscribe(
      response => {
        this.isLoading = false;
          this.alertService.setAlertModel(true,"success","Account successfully created, please comfirm your email");
          this.router.navigate(['login']);
        
      },
      (error: HttpErrorResponse) => {
        this.alertService.setAlertModel(true,"danger", "Some thing went wrong");
        this.isLoading = false;
      }
    )
  }

}
