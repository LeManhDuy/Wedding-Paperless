import {Component, OnInit} from '@angular/core';
import {AccountInfo} from "../../models/account";
import {AccountService} from "../../_services/account.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  standalone: true
})
export class AccountComponent implements OnInit{

  accounts: AccountInfo[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
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
