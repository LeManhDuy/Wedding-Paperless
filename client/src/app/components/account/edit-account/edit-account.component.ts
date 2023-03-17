import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AccountInfo, PersonInfo } from "../../../models/account";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "../../../_services/account.service";
import { EditAccountService } from "../../../_services/edit-account.service";
// import * as jsonpatch from 'fast-json-patch';
import { AuthService } from 'src/app/_services/auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  @Input() idToken: string | undefined;
  @Input() id: string | undefined;
  isLoading :boolean = false;
  isLoadingAvar :boolean = false;

  personInfo: PersonInfo = {
    id: '',
    avatar: 'https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    fullname: '',
    email: '',
  }

  // idToken?: string

  roleToken?: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: EditAccountService,
    private authService: AuthService) {

  }

  selectedFile?: ImageSnippet;

  processFile(avatar: any) {
    const file: File = avatar.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt: any) => {
      this.selectedFile = new ImageSnippet(evt.target.result, file);
      this.personInfo.avatar = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.idToken = this.authService.getTokenId()
    this.roleToken = this.authService.getTokenRole()
    this.isLoadingAvar = true;
    this.route.paramMap.subscribe({
      next: params => {
      if (this.id) {
          if (this.roleToken == "admin") {

            this.personService.getPerson(this.id).subscribe({
              next: response => {
                this.isLoadingAvar = false;
                this.personInfo = response
              },
              error:eror =>{
                this.isLoadingAvar = false;
              }
            })
          }
          else if (this.idToken == this.id) {

            this.personService.getPerson(this.idToken).subscribe({
              next: response => {
                this.isLoadingAvar = false;
                this.personInfo = response
              },
              error:eror =>{
                this.isLoadingAvar = false;
              }
            })
          }
          else {
            this.router.navigate(['not-found']);
          }
        }
        else {
          this.personService.getPerson(this.idToken!).subscribe({
            next: response => {
              this.isLoadingAvar = false;
              this.personInfo = response
            }
          })
        }
      },
      error:eror =>{
        this.isLoadingAvar = false;
      }
    })
  }

  updatePerson() {
    this.isLoading = true;
    if (this.personInfo.id) {// make a copy of the original object
      this.personService.updatePerson(this.personInfo.id, this.personInfo).subscribe(
        (updatedPerson) => {
          this.isLoading = false;
          location.reload()
        },
        (errorMsg: any) => {
          this.isLoading = false;
          console.log(errorMsg)
        }

      );
    }
  }

}