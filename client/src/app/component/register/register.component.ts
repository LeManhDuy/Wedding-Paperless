import { RegisterService } from '../../_services/register.service';
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
  }

  register() {
    this.registerService.register(this.registerUser).subscribe(response => {
      if (this.registerUser.password !== this.registerUser.confirmpassword) {
        this.errorMessage = "Password don't match!";
      }
      else {
        this.errorMessage = "Dont success";
      }
    })
  }

}
