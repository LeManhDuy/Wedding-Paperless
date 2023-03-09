import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  currentUser?: UserToken;
  isAlbumnComponentVisible = false;
  isRegisterComponentVisible = false;
  isAccountComponentVisible = false;
  isContentComponentVisible = true;
  title : string ='Dashboard';
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  showComponent(componentName: string) {
    switch (componentName) {
      case 'register':
        this.title = 'Register Song';
        this.isRegisterComponentVisible = true;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        break;
      case 'albumn':
        this.title = 'Albumn';
        this.isAlbumnComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        break;
      case 'account':
        this.title = 'Account';
        this.isAccountComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isContentComponentVisible = false;
        break;
      case 'content':
        this.title = 'Content';
        this.isContentComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        break;
      default:
        console.error('Invalid component name.');
    }
  }

  showContent() {
    this.router.navigate(['/content']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
