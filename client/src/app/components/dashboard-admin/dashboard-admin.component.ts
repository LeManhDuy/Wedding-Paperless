import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginService } from 'src/app/_services/login.service';
import { AccountService } from "../../_services/account.service";
import { ContentService } from "../../_services/content.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  id?: string;
  currentUser?: UserToken;
  isAccountLoading: boolean = false;
  isContentLoading: boolean = false;

  quantityAccount?: number;
  quantityContent?: number;
  isAccountComponentVisible = false;
  isEditAccountComponentVisible = false;
  isStatisticComponentVisible = true;
  title: string = 'Statistics';

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private contentService: ContentService,
    private router: Router,
    private auth: AuthService) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }
  showComponent(componentName: string) {
    this.id = this.auth.getTokenId();
    switch (componentName) {
      case 'account':
        this.title = 'Account';
        this.isAccountComponentVisible = true;
        this.isStatisticComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;

      case 'statistic':
        this.title = 'Statistics';
        this.isStatisticComponentVisible = true;
        this.isAccountComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;

      case 'editAccount':
        this.title = 'Your Account';
        this.isEditAccountComponentVisible = true;
        this.isStatisticComponentVisible = false;
        this.isAccountComponentVisible = false;
        break;
      default:
        console.error('Invalid component name.');
    }
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.isAccountLoading = true;
    this.accountService.getAllAccounts().subscribe(
      (value) => {
        this.quantityAccount = value.length
        this.isAccountLoading = false;
      }
    )
    this.isContentLoading = true;
    this.contentService.getAllContents().subscribe(
      (value) => {
        this.quantityContent = value.length
        this.isContentLoading = false;
      }
    )
  }
}
