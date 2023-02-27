import { Component } from '@angular/core';
import {LoginService} from "./_services/login.service";
import {Router} from "@angular/router";
import {UserToken} from "./models/app-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser?: UserToken;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }
  title = 'client';
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
