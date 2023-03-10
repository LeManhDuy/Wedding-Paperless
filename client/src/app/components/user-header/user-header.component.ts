import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  currentUser?: UserToken;
  public contentIsExist: boolean = false;
  constructor(private loginService: LoginService, private router: Router, private authService: AuthService, private contentService: ContentService, private route:ActivatedRoute) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.contentService.checkContentIsExistByPersonId().subscribe(value => {
      this.contentIsExist = value;
    });
  }
  showForm() {
    this.router.navigate(['/form']);
  }

  showInvitation() {
    this.router.navigate(['/invitation/'+this.authService.getTokenId()]);
  }
 showEditAccount() {
   this.router.navigate(['account/edit/' + this.authService.getTokenId()]);
}
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
