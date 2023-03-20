import { IsExistContentGuard } from './../../_guards/is-exist-content.guard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';
import { EditAccountService } from 'src/app/_services/edit-account.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './userHeader.component.html',
  styleUrls: ['./userHeader.component.css']
})
export class UserHeaderComponent implements OnInit {
  id?:string;
  avartar:string="https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png";
  isLoading: boolean = false;
  currentUser?: UserToken;
  isLoadingAvartar: boolean =false;
  isExistContent?: boolean ;
  constructor(
    private loginService: LoginService,
    private router: Router,
    public contentService: ContentService,
    private route:ActivatedRoute,
    private auth: AuthService,
    private editAccount: EditAccountService
  ) {
    this.loginService.currentUser?.subscribe(x => {
      this.currentUser = x
      this.currentUser.username = auth.getTokenName()
    });
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

    });
    this.isLoadingAvartar =true;
    const personId = this.auth.getTokenId();
    this.editAccount.getPerson(personId)
    .subscribe(respone =>{
      this.avartar = respone.avatar!;
      this.isLoadingAvartar =false;
    })

  }
    showEditAccount() {
    this.router.navigate(['account/edit/' + this.auth.getTokenId()]);

  }

  showInvitation() {
    this.router.navigate(['/new-invitation/'+this.auth.getTokenId()]);
  }

  editForm(){
    this.router.navigate(['/update-invitation/'+this.auth.getTokenId()]);
  }

  showForm() {
    this.router.navigate(['/form-new-template']);
  }

  showRegisterSong() {
    this.router.navigate(['/register-song']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
