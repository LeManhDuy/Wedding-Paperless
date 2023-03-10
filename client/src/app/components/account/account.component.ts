import {Component, OnInit} from '@angular/core';
import {AccountInfo} from "../../models/account";
import {AccountService} from "../../_services/account.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  id?:string
  isLoading: boolean=false;

  accounts: AccountInfo[] = [];

  isAccountComponentVisible = true;
  isEditAccountComponentVisible = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
  }

  showComponent(albumn: AccountInfo){
    this.id = albumn.id
    this.isAccountComponentVisible = false;
    this.isEditAccountComponentVisible = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.accounts = response;
        // for (let account of this.accounts) {
        //   console.log(account.username)
        // }
      },
      error: err => {
        this.isLoading = false;
        console.log(err)
      }
    })
  }
  back(){
    this.isAccountComponentVisible = true;
    this.isEditAccountComponentVisible = false;
  }
}
