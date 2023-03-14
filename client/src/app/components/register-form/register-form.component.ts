import { Component, Input } from '@angular/core';
import { AlertModel } from 'src/app/models/alertModel';
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
    const alert: AlertModel ={
        isAlert : false,
        type : 'success',
        text: 'Add song successed',
    }
    this.isLoading = true;
    this.registerSongSer.addSongByPersonId(this.personId,this.registerSong)
    .subscribe(
      _ =>{
        this.registerSong = new RegisterSong();
        alert.isAlert =true;
        this.alertService.setAlertModel(alert);
        this.isLoading =false;
      },
      (error) =>{
        this.isLoading =false;
        alert.text="Add failed";
        alert.type ="danger";
        console.log("fefsf");
        alert.isAlert =true;
        this.alertService.setAlertModel(alert);
      }
    )
    
  }
  close(){

  }
}
