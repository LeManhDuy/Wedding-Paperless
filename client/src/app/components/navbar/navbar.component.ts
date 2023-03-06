import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {LoginService} from 'src/app/_services/login.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn$?: Observable<boolean>;
  roleLoggedIn?: string;

  role?: string;
  constructor(private loginService: LoginService,private router: Router) {
    
   }

  ngOnInit() {
    if (this.loginService.currentUserValue) {
      const payloadBase64 = this.loginService.currentUserValue.token?.split('.')[1];
      if (payloadBase64) {
        const payloadJson = atob(payloadBase64);
        const payloadObject = JSON.parse(payloadJson);
        this.role = payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        // if (this.loginService.isLoggedIn)
        //   this.roleLoggedIn == 'user'
      }
      
    }
    return this.roleLoggedIn==='user';
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
}
