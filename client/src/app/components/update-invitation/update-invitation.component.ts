import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
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
  selector: 'app-update-invitation',
  templateUrl: './update-invitation.component.html',
  styleUrls: ['./update-invitation.component.css']
})
export class UpdateInvitationComponent {
  @Input() imageInputModel: ImageInputModel = new ImageInputModel();


  backgroundUrl="https://firebasestorage.googleapis.com/v0/b/marinerum.appspot.com/o/images_by_months%2Fimg%2F-min.jpg?alt=media&token=711d89c1-4249-4ba4-a39e-427aaecd8aba"

  personId: number | undefined;
  contentId: string | undefined;
  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: IMG[] = [];
  isDeleteLoading: boolean =false;
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
    private albumService: AlbumnService,
    private uploadImageService :UploadImageService,
    private route:ActivatedRoute,
    private router : Router,
    private alertService : AlertService,
  ) {
    this.personId = this.route.snapshot.params['id'];
    if(this.personId === undefined){
      this.router.navigate(["dashboard-user"]);
    }

    this.contentService.getContentAttachAlbums(this.personId?.toString()!)
    .subscribe(
      respone =>{
        console.log(respone);
          this.contentId = respone.id
          const albums = respone.albumnDtos;
          this.contentRequest = respone;

          albums?.forEach(item =>{
              if(item.row === 1){
                  this.imageUrl1 = item.imageLink;
                  console.log(this.imageUrl1);

                  this.albumService.currentAlbumFirstPo = item;
              }
              else if(item.row === 2){
                this.imageUrl2 = item.imageLink;
                this.albumService.currentAlbumSecondListPo = item;
              }
              else if(item.row === 3){
                this.imageUrl3 = item.imageLink;
                this.albumService.currentAlbumThirtPo = item;
              }
              else if(item.row === 4){
                this.imageUrl4 = item.imageLink;
                this.albumService.currentAlbumFourthListPo = item;
              }
              else if(item.row === 5){
                this.imageUrl5 = item.imageLink;
                this.albumService.currentAlbumFifthPo = item;
              }
              else if(item.row === 6){
                this.imageUrl6 = item.imageLink;
                this.albumService.currentAlbumSixthPo = item;
              }
              else if(item.row === 7){
                this.imageUrl7 = item.imageLink;
                this.albumService.currentAlbumSeventhPo = item;
              }
              else if(item.row === 8){
                this.imageUrl8 = item.imageLink;
                this.albumService.currentAlbumEightthPo = item;
              }
          })
      },
    )

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

deleteContent(){
  this.isDeleteLoading =true
  this.contentService.deleteContent(this.contentId).subscribe(respone=>{

  this.isDeleteLoading =false

    this.alertService.setAlertModel("success", "Delete successfully!")
  })
  this.contentService.setExistContent(false);
  this.router.navigate(['/dashboard-user']);
}


editContent() {
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

    this.contentService.updateContentById(Number.parseInt(this.contentRequest.id!),this.contentRequest)
    .subscribe(response =>{
        this.albumService.updateListAlbumn(response.id!, listRequest)
        .subscribe(_ =>{
              this.isLoading =false;
              this.alertService.setAlertModel("success","Updated");
              location.reload();
        },
        error =>{
          this.isLoading =false;
          this.alertService.setAlertModel("danger","Some thing went wrong");
        })

    },
    error =>{
      this.isLoading = false;
      this.alertService.setAlertModel("danger","Some thing went wrong content")
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
        album.id = this.contentRequest.albumnDtos[0].id;
        this.albumService.currentAlbumFirstPo = album;
        break;
      case 2:
        album.id = this.contentRequest.albumnDtos[1].id;
        this.albumService.currentAlbumSecondListPo = album;
        break;

      case 3:
        album.id = this.contentRequest.albumnDtos[2].id;
        this.albumService.currentAlbumThirtPo = album;
        break;

        case 4:
          album.id = this.contentRequest.albumnDtos[3].id;
          this.albumService.currentAlbumFourthListPo = album;
          break;
      case 5:
        album.id = this.contentRequest.albumnDtos[4].id;
        this.albumService.currentAlbumFifthPo = album;
        break;

        case 6:
          album.id = this.contentRequest.albumnDtos[5].id;
          this.albumService.currentAlbumSixthPo = album;
          break;
        case 7:
          album.id = this.contentRequest.albumnDtos[6].id;
          this.albumService.currentAlbumSeventhPo = album;
          break;
        case 8:
          album.id = this.contentRequest.albumnDtos[7].id;
          this.albumService.currentAlbumEightthPo = album;
          break;
    }
  }
}
