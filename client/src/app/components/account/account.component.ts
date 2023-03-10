import {Component, OnInit} from '@angular/core';
import {AccountInfo} from "../../models/account";
import {AccountService} from "../../_services/account.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  id?:string

  accounts: AccountInfo[] = [];

  isAlbumnComponentVisible = true;
  isEditAlbumnComponentVisible = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private auth : AuthService
  ) {
  }

  showComponent(albumn: AccountInfo){
    this.id = albumn.id
    this.isAlbumnComponentVisible = false;
    this.isEditAlbumnComponentVisible = true;
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (response) => {
        this.accounts = response;
        // for (let account of this.accounts) {
        //   console.log(account.username)
        // }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
