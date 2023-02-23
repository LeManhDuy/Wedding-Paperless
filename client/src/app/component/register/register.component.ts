import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/app-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser()
  errorMessage: string | undefined
  //registerForm: FormGroup | undefined;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.registerForm = this.formBuilder.group({
    //   fullname: ['', [Validators.required]],
    //   username: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   confirmpassword: ['', [Validators.required]]
    // });
  }

  register() {
    this.registerService.register(this.registerUser).subscribe(response => {
      console.log(this.registerUser);
      if (this.registerUser.password !== this.registerUser.confirmpassword) {
        this.errorMessage = "Password don't match!";
      }
      else {
        this.errorMessage = "Dont success";
      }
    })
  }

}
