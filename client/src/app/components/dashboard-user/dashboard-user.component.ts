import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { LoginService } from 'src/app/_services/login.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  currentUser?: UserToken;

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  showForm() {
    this.router.navigate(['/form']);
  }

  showEditAccount() {
    this.router.navigate(['account/edit/' + this.authService.getTokenId()]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}