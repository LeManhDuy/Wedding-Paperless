import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountInfo} from "../../../models/account";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../_services/account.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class EditAccountComponent implements OnInit{
  accountInfo: AccountInfo = {
    id: '',
    username: '',
    avatar: '',
    fullname: '',
    email:'',
    role:''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) {

  }


  selectedFile?: ImageSnippet;

  processFile(avatar: any) {
    const file: File = avatar.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt: any) => {
      this.selectedFile = new ImageSnippet(evt.target.result, file);
      this.accountInfo.avatar = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id')
        if (id) {
          this.accountService.getAccount(id).subscribe({
            next: response => {
              this.accountInfo = response
            }
          })
        }
      }
    })
  }

  // updateAccount() {
  //   if (this.accountInfo.id) {
  //     this.accountService.updateAccount(this.albumnDetails.id)
  //   }
  // }

}
