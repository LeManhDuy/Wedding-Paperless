import { Component } from '@angular/core';
import {LoginService} from "./_services/login.service";
import {Router} from "@angular/router";
import {UserToken} from "./models/app-user";
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser?: UserToken;
  isUser?:string = "" ;
  
  constructor(
    private loginService: LoginService,
    private router: Router, 
    public auth: AuthService,
  ) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }
  title = 'client';

  ngOnInit(): void{
    console.log(this.isUser);
    
    this.checkIsUser();
  }
  checkIsUser(){ 
      this.auth.getLocalStorageChanges()?.subscribe(
        respone =>{
           this.isUser = respone!; 
      }
      )
      }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
