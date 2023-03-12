import { AuthService } from './_services/auth.service';

import { Component } from '@angular/core';
import {LoginService} from "./_services/login.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserToken} from "./models/app-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser?: UserToken;

  showHeader = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }
  title = 'client';
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const dwd= 'dwad';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      this.showHeader = this.activatedRoute.firstChild!.snapshot.data['showHeader'] === true;
      if(this.auth.getTokenRole() === 'admin'){
        this.showHeader = false;
      }
      }
    });
  }
}
