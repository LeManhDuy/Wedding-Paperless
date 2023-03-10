import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  id?:string
  currentUser?: UserToken;
  isAlbumnComponentVisible = false;
  isRegisterComponentVisible = false;
  isAccountComponentVisible = false;
  isContentComponentVisible = true;
  isEditAccountComponentVisible = false;

  title : string ='Content';
  constructor(private loginService: LoginService, private router: Router, private auth: AuthService) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  showComponent(componentName: string) {
    this.id = this.auth.getTokenId()
    switch (componentName) {
      case 'register':
        this.title = 'Register Song';
        this.isRegisterComponentVisible = true;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'albumn':
        this.title = 'Albumn';
        this.isAlbumnComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'account':
        this.title = 'Account';
        this.isAccountComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;

        break;
      case 'content':
        this.title = 'Content';
        this.isContentComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'editAccount':
        this.title = 'Your Account';
        this.isEditAccountComponentVisible = true;
        this.isContentComponentVisible = false;
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
