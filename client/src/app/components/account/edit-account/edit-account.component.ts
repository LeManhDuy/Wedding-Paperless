import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountInfo, PersonInfo} from "../../../models/account";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../_services/account.service";
import {EditAccountService} from "../../../_services/edit-account.service";
import * as jsonpatch from 'fast-json-patch';

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
  personInfo: PersonInfo = {
    id: '',
    avatar: '',
    fullname: '',
    email:'',
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: EditAccountService) {

  }


  selectedFile?: ImageSnippet;

  processFile(avatar: any) {
    const file: File = avatar.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt: any) => {
      this.selectedFile = new ImageSnippet(evt.target.result, file);
      this.personInfo.avatar = this.selectedFile.src;
      console.log(this.personInfo.avatar)
    });
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id')
        if (id) {
          this.personService.getPerson(id).subscribe({
            next: response => {
              this.personInfo = response
              console.log(this.personInfo)
            }
          })
        }
      }
    })
  }

  updatePerson() {
    // if (this.personInfo.id) {
    //   this.personService.updatePerson(this.personInfo.id, this.personInfo)
    // }
    if (this.personInfo.id) {// make a copy of the original object
      this.personService.updatePerson(this.personInfo.id, this.personInfo ).subscribe(
        (updatedPerson) => {
          this.router.navigate(['account'])
        }
      );
    }
  }

}
