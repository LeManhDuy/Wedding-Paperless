import { Message } from './../../model/message';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser()
  errorMessage: string | undefined

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {

  }

  register() {
    this.registerService.register(this.registerUser).subscribe(response => {
      console.log("1", response);
    }, error => {
      if (this.registerUser.email == '' || this.registerUser.fullname == '' || this.registerUser.password == '' || this.registerUser.username == '') {
        this.errorMessage = "Fill enough input!";
      }
      else {
        this.errorMessage = "Validate Email!";

      }
    });
  }

}
