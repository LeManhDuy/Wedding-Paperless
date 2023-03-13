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

  personInfo: PersonInfo = {
    id: '',
    avatar: '',
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
    this.route.paramMap.subscribe({
      next: params => {
      if (this.id) {
          if (this.roleToken == "admin") {

            this.personService.getPerson(this.id).subscribe({
              next: response => {

                this.personInfo = response
              }
            })
          }
          else if (this.idToken == this.id) {

            this.personService.getPerson(this.idToken).subscribe({
              next: response => {

                this.personInfo = response
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
              this.personInfo = response
            }
          })
        }
      }
    })
  }

  updatePerson() {
    if (this.personInfo.id) {// make a copy of the original object
      this.personService.updatePerson(this.personInfo.id, this.personInfo).subscribe(
        (updatedPerson) => {
          location.reload()
        }
      );
    }
  }

}
