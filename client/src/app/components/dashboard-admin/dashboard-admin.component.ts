import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  currentUser?: UserToken;

  constructor(private loginService: LoginService, private router: Router) { 
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showContent() {
    this.router.navigate(['/content']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  
}
