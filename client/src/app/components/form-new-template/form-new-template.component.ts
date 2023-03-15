import {Component} from '@angular/core';
import {Route, Router} from '@angular/router';
import {Content, ContentRequest} from 'src/app/models/content';
import {AlbumnService} from 'src/app/_services/albumn.service';
import {ContentService} from 'src/app/_services/content.service';
import {LoginService} from 'src/app/_services/login.service';
import {FormControl, Validators} from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker/public-api';
import { Time } from 'highcharts';
@Component({
  selector: 'app-form-new-template',
  templateUrl: './form-new-template.component.html',
  styleUrls: ['./form-new-template.component.css']
})
export class FormNewTemplateComponent {
  isLoading : boolean = false;
  contentRequest: Content = new Content();
  public hostControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public datetimeControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public addressControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public storyControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);

  constructor
  (
    private contentService: ContentService,
    private router: Router,
    private albumService: AlbumnService,
  ) {
    this.contentRequest.date = new Date()
  }

  saveContent() {
    this.isLoading = true;
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
                this.isLoading = false;
                location.reload()

                // this.router.navigate(['dashboard-user'])
              },
              (errorMsg: any) => {
                this.isLoading = false;
                console.log(errorMsg)

              })
        },
        (errorMsg: any) => {
        this.isLoading = false;
          console.log(errorMsg)

        }

      )

  }
}
