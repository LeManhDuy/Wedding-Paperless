import { Component, Input } from '@angular/core';
import { RegisterSong } from 'src/app/models/song';
import { AlertService } from 'src/app/_services/alert.service';
import { RegisterSongService } from 'src/app/_services/register-song.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @Input() personId:string='0';
  registerSong: RegisterSong = new RegisterSong();
  isLoading: boolean =false;

  constructor(private registerSongSer:RegisterSongService, private alertService: AlertService) {

  }
  save(){
    const {fullName,songName, linkBeat } =this.registerSong;
      if(fullName?.trim() === ""|| songName?.trim() ===""|| linkBeat?.trim() === "" ){
        this.alertService.setAlertModel("danger", 'Some field is empty');
        return;
      };
    this.isLoading = true;
    this.registerSongSer.addSongByPersonId(this.personId,this.registerSong)
    .subscribe(
      _ =>{
        this.registerSong = new RegisterSong();
        this.alertService.setAlertModel("success", 'Add song successed');
        this.isLoading =false;
      },
      (error) =>{
        this.isLoading =false;
        this.alertService.setAlertModel('danger',"Add failed");
      }
    )

  }
  close(){

  }
}
