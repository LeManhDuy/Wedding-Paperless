import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
};
export const ROUTES: RouteInfo[] = [
  { path: '/account',     title: 'Account',         icon:'nc-bank',       class: '' },
  { path: '/albumn',         title: 'Albumn',             icon:'nc-diamond',    class: '' },
  { path: '/content',         title: 'Contents',        icon:'nc-tile-56',    class: '' },
  { path: '/register-song', title: 'Register song',     icon:'nc-bell-55',    class: '' },
  { path: '/Login',          title: 'Logout',      icon:'nc-single-02',  class: '' },
];


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})


export class SidebarAdminComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router) { 
  }
  public menuItems: any[] | undefined;
  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  logout() {
    this.loginService.logout();
  }
}
