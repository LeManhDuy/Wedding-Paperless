import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/model/app-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser()

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register() {
    this.registerService.register(this.registerUser).subscribe();
  }

}
