import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {LoginService} from 'src/app/_services/login.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserToken } from 'src/app/models/app-user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn$?: boolean;
  userRole?: string;
  public currentUser : UserToken | undefined
  constructor(private loginService: LoginService,private router: Router, private authService : AuthService) {
   }
  
  ngOnInit() {
    this.loginService.isLoggedIn.subscribe(
      respone => {
        this.isLoggedIn$ = respone;
      }
    );

    this.loginService.currentUserValueBehaviorSubject()
    .subscribe(respone =>{
      const token = respone.token;
      const role = this.loginService.parseTokenToRole(token!);
      this.userRole = role;
    })
  }  

  

  onLogout(){
    this.loginService.logout();                      // {3}
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  showDashboard() {
    this.router.navigate(['/dashboard-user']);
    
  }
  showContent() {
    this.router.navigate(['/content']);
  }
  
}
