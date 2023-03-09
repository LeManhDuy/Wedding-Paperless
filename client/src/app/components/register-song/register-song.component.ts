import {Component, OnInit} from '@angular/core';
import {RegisterSong} from "../../models/song";
import {Content} from "../../models/content";
import {RegisterSongService} from "../../_services/register-song.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ContentService} from "../../_services/content.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgFor} from "@angular/common";

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
  isAlbumnComponentVisible = true;
  isEditAlbumnComponentVisible = false;
  id?:string
  constructor(
    private registerSongService: RegisterSongService,
    private router: Router,
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.registerSongService.getAllSongs().subscribe({
      next: (response) => {
        this.songs = response;
      },
      error: (error) => {
        console.log(error )
      }
    })

    this.contentService.getAllContents().subscribe({
      next: (response) => {
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
    this.isAlbumnComponentVisible = false;
    this.isEditAlbumnComponentVisible = true;
  }

  onContentSelected(value: any) {
    if (this.song) {
      this.song.contentId = value.target.value;
    }
  }

  addSong() {
    if (this.song?.contentId) {
      this.registerSongService.addSong(this.song.contentId, this.song).subscribe({
        next: (song) => {
          this.router.navigate(['dashboard-admin']);
        }
      })
    }
  }

}
