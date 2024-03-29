import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import { AlertService } from 'src/app/_services/alert.service';

class IMG {
  image?: string;
  thumbImage?: string;
}
@Component({
  selector: 'app-form-new-template',
  templateUrl: './form-new-template.component.html',
  styleUrls: ['./form-new-template.component.css']
})
export class FormNewTemplateComponent implements OnInit {
  @Input() imageInputModel: ImageInputModel = new ImageInputModel();


  backgroundUrl="https://firebasestorage.googleapis.com/v0/b/marinerum.appspot.com/o/images_by_months%2Fimg%2F-min.jpg?alt=media&token=711d89c1-4249-4ba4-a39e-427aaecd8aba"


  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: IMG[] = [];
  isLoading : boolean = false;
  contentRequest: Content = new Content();
  public hostControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public datetimeControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public addressControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  public storyControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  imageUrl1 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl2 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl3 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl4 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl5 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl6 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl7 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl8 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  constructor
  (
    private contentService: ContentService,
    private router: Router,
    private albumService: AlbumnService,
    private uploadImageService :UploadImageService,
    private alerService : AlertService,
  ) {

    this.contentRequest.date = new Date()
    this.contentRequest.address = 'For U, Hai Chau District, Danang City'
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
      currentAlbumSixthPo,
      currentAlbumSeventhPo,
      currentAlbumEightthPo
    } = this.albumService;

    var listRequest = [
      currentAlbumFirstPo,
      currentAlbumSecondListPo,
      currentAlbumThirtPo,
      currentAlbumFourthListPo,
      currentAlbumFifthPo,
      currentAlbumSixthPo,
      currentAlbumSeventhPo,
      currentAlbumEightthPo
    ]
    this.contentService.creatContent(this.contentRequest)
      .subscribe(respone => {
          this.albumService.currentContentId = Number.parseInt(respone.id!);
          this.albumService.createListOfAlbum(listRequest, this.albumService.currentContentId)
            .subscribe(respone => {
                this.contentService.setExistContent(true);
                this.isLoading = false;
                this.alerService.setAlertModel("success","Created")
                location.reload()

                // this.router.navigate(['dashboard-user'])
              },
              (errorMsg: any) => {
                this.isLoading = false;
                this.alerService.setAlertModel("danger","Some thing went wrong")
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
        row === 1 || row === 2 || row === 3 || row === 4 || row === 5 || row === 6 || row === 7|| row === 8 ? this.addImageToSingleStorge(album, row) : null
        switch (row){
          case 1:
            this.imageUrl1 =album.imageLink;
            break;
          case 2:
            this.imageUrl2 =album.imageLink;
            break;
          case 3:
            this.imageUrl3 = album.imageLink;
            break;
            case 4:
              this.imageUrl4 =album.imageLink;
              break;
          case 5:
            this.imageUrl5 = album.imageLink;
            break;
            case 6:
              this.imageUrl6 =album.imageLink;
              break;
            case 7:
              this.imageUrl7 =album.imageLink;
              break;
            case 8:
              this.imageUrl8 =album.imageLink;
              break;
        }
    });
  }

  addImageToSingleStorge(album : AlbumnRequest, row: number){
    // this.imageUrl = album.imageLink!;
    switch (row){
      case 1:
        this.albumService.currentAlbumFirstPo = album;
        break;
      case 2:
        this.albumService.currentAlbumSecondListPo = album;
        break;

      case 3:
        this.albumService.currentAlbumThirtPo = album;
        break;

        case 4:
          this.albumService.currentAlbumFourthListPo = album;
          break;
      case 5:
        this.albumService.currentAlbumFifthPo = album;
        break;

        case 6:
          this.albumService.currentAlbumSixthPo = album;
          break;
        case 7:
          this.albumService.currentAlbumSeventhPo = album;
          break;
        case 8:
          this.albumService.currentAlbumEightthPo = album;
          break;
    }
  }
}
