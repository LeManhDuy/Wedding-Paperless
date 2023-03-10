import { Component} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Content, ContentRequest } from 'src/app/models/content';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  contentRequest: Content = new Content();
  public hostControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public datetimeControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public addressControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public storyControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);

  constructor
  (
    private contentService: ContentService,
    private loginService: LoginService,
    private router: Router,
    private albumService: AlbumnService
  ) {}

  saveContent(){
    var {
      currentAlbumFirstPo,
      currentAlbumSecondListPo,
      currentAlbumThirtPo,
      currentAlbumFourthListPo,
      currentAlbumFifthPo,
    } = this.albumService;

    var listRequest = [
        currentAlbumFirstPo,
        ...currentAlbumSecondListPo,
        currentAlbumThirtPo,
        ...currentAlbumFourthListPo,
        currentAlbumFifthPo
    ]
      this.contentService.creatContent(this.contentRequest)
      .subscribe(respone => {

        this.albumService.currentContentId = Number.parseInt(respone.id!);
        this.albumService.createListOfAlbum(listRequest, this.albumService.currentContentId)
        .subscribe(respone => {
          this.contentService.setExistContent(true);
          location.reload()
        })
      },
      (errorMsg: any) => {
        console.log(errorMsg)

      }
      )

  }
}
