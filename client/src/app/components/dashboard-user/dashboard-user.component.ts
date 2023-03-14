import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AuthService } from 'src/app/_services/auth.service';
import { ContentService } from 'src/app/_services/content.service';
import { EditAccountService } from 'src/app/_services/edit-account.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

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
  
  showForm() {
    this.router.navigate(['/form']);
  }
}
