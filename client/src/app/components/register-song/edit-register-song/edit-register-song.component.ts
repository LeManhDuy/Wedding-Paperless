import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { RegisterSong } from 'src/app/models/song';
import { RegisterSongService } from 'src/app/_services/register-song.service';
import { RegisterSongComponent } from '../register-song.component';

@Component({
  selector: 'app-edit-register-song',
  templateUrl: './edit-register-song.component.html',
  styleUrls: ['./edit-register-song.component.css']
})
export class EditRegisterSongComponent implements OnInit {
  @Input() id: string | undefined;

  song: RegisterSong = {
    id: '',
    fullName: '',
    songName: '',
    linkBeat: '',
    contentId: ''
  }
  contents?: Content[]

  constructor(
    private registerSongService: RegisterSongService,
    private router: Router,
    private route: ActivatedRoute,
    private registerSongComponent: RegisterSongComponent
  ) {
  }

  back() {
    this.registerSongComponent.back()
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        if (this.id) {
          this.registerSongService.getSong(this.id).subscribe({
            next: (response) => {
              this.song = response;
            }
          })
        }
      }
    })
    // this.contentSerivce.getAllContents().subscribe({
    //   next: (response) => {
    //     response.forEach(item => {
    //       if (item.personId == this.auth.getTokenId()) {
    //         this.idContent = item.id;
    //         this.contentSerivce.getSongsOfContent(item.id!).subscribe({
    //           next: (response) => {
    //             this.songs = response;
    //           },
    //           error: (error) => {
    //             console.log(error )
    //           }
    //         })
    //       }
    //     })
    //     this.song.contentId = response[0].id
    //     this.contents = response
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
  }

  updateRegisterSong(id?: string) {
    if (id) {
      this.registerSongService.updateSong(id, this.song).subscribe({
        next: (song) => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
    }
  }

  deleteRegisterSong(id?: string) {
    if (id) {
      this.registerSongService.deleteSong(id).subscribe({
        next: (song) => {
          location.reload()
        }
      });
    }
  }
}
