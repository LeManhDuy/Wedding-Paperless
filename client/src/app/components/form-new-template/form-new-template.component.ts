import {Component, EventEmitter, Input, Output} from '@angular/core';
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
import { ImageInputModel } from 'src/app/models/imageInputContent';

class IMG {
  image?: string;
  thumbImage?: string;
}
@Component({
  selector: 'app-form-new-template',
  templateUrl: './form-new-template.component.html',
  styleUrls: ['./form-new-template.component.css']
})
export class FormNewTemplateComponent {
  @Input() imageInputModel: ImageInputModel = new ImageInputModel();
  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: Array<object> = [];
  isLoading : boolean = false;
  contentRequest: Content = new Content();
  public hostControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public datetimeControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public addressControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public storyControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  imageUrl : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrlMain : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrlRes : String = "https://firebasestorage.googleapis.com/v0/b/marinerum.appspot.com/o/images_by_months%2Fimg%2F-min.jpg?alt=media&token=711d89c1-4249-4ba4-a39e-427aaecd8aba";
  constructor
  (
    private contentService: ContentService,
    private router: Router,
    private albumService: AlbumnService,
    private uploadImageService :UploadImageService,
  ) {
    this.contentRequest.date = new Date()
    this.contentRequest.address = 'For U, Hai Chau District, Danang City'
  }
  // Update the type of imageData to match ImageInputModel

// Update the onImageData() function to receive ImageInputModel instead of string
// onImageData(imageData: any) {
//   console.log('Image data received in parent component:', imageData);
//   // Handle the image data here
// }


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
  async onFileSelected(event: any, row :any  ) {
    this.isLoading =true;
    const roww = Number.parseInt(row!);
    const base64 = await this.uploadImageService.processFileToBase64(event.target);
    this.setCurrentAlbum(base64, roww);
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
        row === 2 || row === 4 ? this.addImageToMultipleStorge(album, row) : this.addImageToSingleStorge(album, row);
        switch (row){
          case 1:
            this.imageUrlMain =album.imageLink;
            break;
          case 3:
            this.imageUrlRes = album.imageLink;
            break;
          case 5:
            break;
        }
        this.isLoading =false;
    });
  }

  addImageToSingleStorge(album : AlbumnRequest, row: number){
    // this.imageUrl = album.imageLink!;
    switch (row){
      case 1:
        this.albumService.currentAlbumFirstPo = album;
        break;
      case 3:
        this.albumService.currentAlbumThirtPo = album;
        break;
      case 5:
        this.albumService.currentAlbumFifthPo = album;
        break;
    }
  }

  addImageToMultipleStorge(album : AlbumnRequest, row: number){
    var imageObject ={
      image: album.imageLink,
      thumbImage: album.imageLink,
      }
      switch (row){
        case 2:
          this.pushToAlbumList(this.imageObjectOurStory,this.albumService.currentAlbumSecondListPo,album,imageObject);
          break;
        case 4:
          this.pushToAlbumList(this.imageObjectOurStory,this.albumService.currentAlbumFourthListPo,album,imageObject);
          break;
      }
    }

  pushToAlbumList(currentObject :Array<object>, list:AlbumnRequest[],album : AlbumnRequest,imageObject ={} ){
    currentObject.push(imageObject);
    list.push(album);
  }

}
