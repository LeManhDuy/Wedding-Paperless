import {Component, OnInit} from '@angular/core';
import {RegisterSong} from "../../models/song";
import {Content} from "../../models/content";
import {RegisterSongService} from "../../_services/register-song.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ContentService} from "../../_services/content.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgFor} from "@angular/common";
import { AuthService } from 'src/app/_services/auth.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register-song',
  templateUrl: './register-song.component.html',
  styleUrls: ['./register-song.component.css']
})
export class RegisterSongComponent implements OnInit{
  songs?: RegisterSong[]
  contents?: Content[]
  song: RegisterSong = {
    fullName: '',
    songName: '',
    linkBeat: ''
  }
  isRegisterSongComponentVisible = true;
  isEditRegisterSongComponentVisible = false;
  id?:string
  constructor(
    private registerSongService: RegisterSongService,
    private contentSerivce: ContentService,
    private router: Router,
    private accountService: AccountService,
    private auth: AuthService
  ) {
  }
  idContent?: string;
  ngOnInit(): void {
    this.contentSerivce.getAllContents().subscribe({
      next: (response) => {
        response.forEach(item => {
          if (item.personId == this.auth.getTokenId()) {
            this.idContent = item.id;
            this.contentSerivce.getSongsOfContent(item.id!).subscribe({
              next: (response) => {
                this.songs = response;
              },
              error: (error) => {
                console.log(error )
              }
            })
          }
        })
        this.song.contentId = response[0].id
        this.contents = response
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  showComponent(song: RegisterSong){
    this.id = song.id
    this.isRegisterSongComponentVisible = false;
    this.isEditRegisterSongComponentVisible = true;
  }

  addSong() {
    if (this.song?.contentId) {
      this.registerSongService.addSong(this.idContent!, this.song).subscribe({
        next: (song) => {
          location.reload()
        }
      })
    }
  }

  back(){
    this.isRegisterSongComponentVisible = true;
    this.isEditRegisterSongComponentVisible = false;
  }

}
