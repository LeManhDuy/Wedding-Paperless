import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { ContentService } from 'src/app/_services/content.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../_services/auth.service";

// import {HeadService} from '../service/head.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
  template:`
        <ng-image-slider [images]="imageObject" #nav>
        </ng-image-slider>
        <button (click)="prevImageClick()">Prev</button>
        <button (click)="nextImageClick()">Next</button>
        `
})

export class InvitationComponent {

  @Input() reviewInDashBoard : boolean = false;
  @Input() contentPerson: Content | undefined;
  isLoading : boolean =false;
  content: Content = new Content();
  imageObjectOurStory: Array<object> = [];
  imageObjectOurMemory: Array<object> = [];
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  hashMapContent = new Map();
  imageUrl1 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    constructor(private contentService: ContentService, private router: Router,private route: ActivatedRoute, private auth: AuthService,private albumService: AlbumnService) {
    this.myAngularxQrCode =  environment.apiURLClient + 'share-invitation/' + auth.getTokenId();
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  ngOnInit(): void {
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

    const id = this.auth.getTokenId()
    this.contentService.checkContentIsExistByPersonId().subscribe(value => {
      console.log(value);

        if(!value){
            this.router.navigate(['dashboard-user']);
            return;
        }
        if (this.contentPerson?.personId){
          this.getContent(this.contentPerson?.personId!);
          return;
        }
      this.getContent(id!);
    });
  }

  getContent(id : string): void{
    this.isLoading = true;
      this.contentService.getContentAttachAlbums(id)
      .subscribe(respone =>{
        this.content = respone;
        console.log(respone);
        this.content.albumnDtos?.forEach(element => {
          console.log("1",element);
            // this.imageUrl1.set(element.row,element);
        });
        this.isLoading = false;
      })
  }

  // pushToObject(object: Array<object>, element : AlbumnRequest){
  //   const image = {
  //     image: element.imageLink,
  //     thumbImage:element.imageLink,
  //    }
  //   object.push(image);
  // }
}
