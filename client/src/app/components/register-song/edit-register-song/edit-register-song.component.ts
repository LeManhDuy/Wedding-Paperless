import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterSong } from 'src/app/models/song';
import { RegisterSongService } from 'src/app/_services/register-song.service';

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

  constructor(
    private registerSongService: RegisterSongService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
  }

  updateRegisterSong(id?: string) {
    if (id) {
      this.registerSongService.updateSong(id, this.song).subscribe({
        next: (song) => {
          location.reload()
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
