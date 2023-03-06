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
  isLoggedIn$?: Observable<boolean>;                  // {1}

  constructor(private LoginService: LoginService,private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.LoginService.isLoggedIn; // {2}
  }

  onLogout(){
    this.LoginService.logout();                      // {3}
  }
  logout() {
    this.LoginService.logout();
    this.router.navigate(['/login']);
  }
  showDashboard() {
    this.router.navigate(['/dashboard-user']);
  }
}
