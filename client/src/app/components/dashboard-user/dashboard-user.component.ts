import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';
import {AccountInfo} from "../../models/account";
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  id?:string
  currentUser?: UserToken;
  public contentIsExist: boolean = false;
  isFormComponentVisible = false;
  isInvitationComponentVisible = false;
  isEditAccountComponentVisible = false;
  isImageVisible = true;
  idToken: any;

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService, private contentService: ContentService, private route:ActivatedRoute) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.contentService.checkContentIsExistByPersonId().subscribe(value => {
      this.contentIsExist = value;
    });


  }

  showComponent(componentName: string) {
    this.id = this.authService.getTokenId()
    switch (componentName) {
      case 'form':
        this.isFormComponentVisible = true;
        this.isInvitationComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        this.isImageVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'invitation':
        this.isInvitationComponentVisible = true;
        this.isFormComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        this.isImageVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'editAccount':
        this.isFormComponentVisible = false;
        this.isInvitationComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        this.isImageVisible = false;
        this.isEditAccountComponentVisible = true;
        break;
      default:
        console.error('Invalid component name.');
    }
  }

  // showEditAccount() {
  //   this.router.navigate(['account/edit/' + this.authService.getTokenId()]);
  // }
  showInvitation() {
    this.router.navigate(['/invitation/'+this.authService.getTokenId()]);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
