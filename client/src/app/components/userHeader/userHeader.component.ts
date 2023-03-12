import { IsExistContentGuard } from './../../_guards/is-exist-content.guard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './userHeader.component.html',
  styleUrls: ['./userHeader.component.css']
})
export class UserHeaderComponent implements OnInit {
  id?:string;
  isLoading: boolean = false;
    currentUser?: UserToken;
  isExistContent?: boolean ;
  constructor(private loginService: LoginService, private router: Router, private authService: AuthService, public contentService: ContentService, private route:ActivatedRoute, private auth: AuthService) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
    this.isLoading = true;
    this.contentService.checkContentIsExistByPersonId()
    .subscribe(respone =>{
      this.isLoading = false;
      this.isExistContent = respone;
    })
  }

  ngOnInit(): void {
    this.contentService.getExistContent()?.subscribe(_ =>{
    this.isExistContent = _;
    })
  }
    showEditAccount() {
    this.id = this.auth.getTokenId();
    this.router.navigate(['account/edit/' + this.authService.getTokenId()]);
  }

  showInvitation() {
    this.router.navigate(['/invitation/'+this.authService.getTokenId()]);
  }

  showForm() {
    this.router.navigate(['/form']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
