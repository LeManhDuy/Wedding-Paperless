import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {UserToken} from 'src/app/models/app-user';
import {AuthService} from 'src/app/_services/auth.service';
import {LoginService} from 'src/app/_services/login.service';
import {AccountService} from "../../_services/account.service";
import {AlbumnService} from "../../_services/albumn.service";
import {ContentService} from "../../_services/content.service";
import {RegisterSongService} from "../../_services/register-song.service";
import {Quantity} from "../../models/quantity";
import {tap} from "rxjs";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  id?: string;
  currentUser?: UserToken;
  isAccountLoading: boolean = false;
  isAlbumLoading: boolean = false;
  isContentLoading: boolean = false;
  isSongLoading: boolean = false;

  quantityAccount?:number;
  quantityAlbumn?:number;
  quantityContent?:number;
  quantityRegisterSong?:number;
  isAlbumnComponentVisible = false;
  isRegisterComponentVisible = false;
  isAccountComponentVisible = false;
  isContentComponentVisible = true;
  isEditAccountComponentVisible = false;
  title: string = 'Content';

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private albumnService: AlbumnService,
    private contentService: ContentService,
    private registerSongService: RegisterSongService,
    private router: Router,
    private auth: AuthService) {
    this.loginService.currentUser?.subscribe(x => this.currentUser = x);
  }

  showComponent(componentName: string) {
    this.id = this.auth.getTokenId();
    switch (componentName) {
      case 'register':
        this.title = 'Register Song';
        this.isRegisterComponentVisible = true;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'albumn':
        this.title = 'Albumn';
        this.isAlbumnComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'account':
        this.title = 'Account';
        this.isAccountComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isContentComponentVisible = false;
        this.isEditAccountComponentVisible = false;
        break;
      case 'content':
        this.title = 'Content';
        this.isContentComponentVisible = true;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
        this.isAccountComponentVisible = false;
        this.isEditAccountComponentVisible = false;

        break;
      case 'editAccount':
        this.title = 'Your Account';
        this.isEditAccountComponentVisible = true;
        this.isContentComponentVisible = false;
        this.isRegisterComponentVisible = false;
        this.isAlbumnComponentVisible = false;
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
    this.isAlbumLoading = true;
    this.albumnService.getAllAlbumns().subscribe(
      (value) => {
        this.quantityAlbumn = value.length
        this.isAlbumLoading = false;
      }
    )
    this.isContentLoading = true;
    this.contentService.getAllContents().subscribe(
      (value) => {
        this.quantityContent = value.length
        this.isContentLoading = false;
      }
    )
    this.isSongLoading = true;
    this.registerSongService.getAllSongs().subscribe(
      (value) => {
        this.quantityRegisterSong = value.length
        this.isSongLoading = false;
      }
    )
  }
}
