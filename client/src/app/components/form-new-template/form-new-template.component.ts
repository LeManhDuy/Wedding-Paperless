import {Component} from '@angular/core';
import {Route, Router} from '@angular/router';
import {Content, ContentRequest} from 'src/app/models/content';
import {AlbumnService} from 'src/app/_services/albumn.service';
import {ContentService} from 'src/app/_services/content.service';
import {LoginService} from 'src/app/_services/login.service';
import {FormControl, Validators} from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker/public-api';
import { Time } from 'highcharts';
import { UploadImageService } from 'src/app/_services/upload-image.service';
import { AlbumnRequest } from 'src/app/models/albumn';
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
  imageUrl : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrlMain : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  constructor
  (
    private contentService: ContentService,
    private router: Router,
    private albumService: AlbumnService,
    private uploadImageService :UploadImageService,
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

  async assignImageBg(event: any){
    const base64 = await this.uploadImageService.processFileToBase64(event.target);
    this.setCurrentAlbum(base64,1);
  }

  public setCurrentAlbum(base64: string, row : number ){
    this.uploadImageService.processConvertBase64ToUrl(base64)
    .subscribe(response =>{
        const album : AlbumnRequest= {
          imageLink : response,
          row : row,
        }
        this.imageUrlMain = response;
        this.addImageToSingleStorge(album, row);
        this.isLoading =false;
    });
  }

  addImageToSingleStorge(album : AlbumnRequest, row: number){
    this.imageUrl = album.imageLink!;
    this.albumService.currentAlbumFirstPo = album;
    }



}
