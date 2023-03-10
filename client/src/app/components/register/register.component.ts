import { RegisterService } from '../../_services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/app-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser()
  errorMessage: string | undefined
  isLoading: boolean = false;
  //registerForm: FormGroup | undefined;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true;
    this.registerService.register(this.registerUser).subscribe(
      response => {
        this.isLoading = false;
        if (this.registerUser.password !== this.registerUser.confirmpassword) {
          this.errorMessage = "Password don't match!";
        }
        else {
          this.router.navigate(['login']);
        }
      },
      error => {
        this.isLoading = false;
        this.router.navigate(['login']);
      }
    )
  }

}
