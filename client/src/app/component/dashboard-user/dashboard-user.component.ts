import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  currentUser?: UserToken;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showForm() {
    this.router.navigate(['/form']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
