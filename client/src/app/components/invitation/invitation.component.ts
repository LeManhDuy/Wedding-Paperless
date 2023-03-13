import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
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
  content: Content = new Content();
  imageObjectOurStory: Array<object> = [];
  imageObjectOurMemory: Array<object> = [];
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  hashMapContent = new Map();
  constructor(private contentService: ContentService, private router: Router,private route: ActivatedRoute, private auth: AuthService) {
    this.myAngularxQrCode =  environment.apiURLClient + router.url;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  ngOnInit(): void {
    const id = this.auth.getTokenId()
    this.contentService.checkContentIsExistByPersonId().subscribe(value => {
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
      this.contentService.getContentAttachAlbums(id)
      .subscribe(respone =>{
        this.content = respone;

        this.content.albumnDtos?.forEach(element => {
            if(element.row === 2){
              this.pushToObject(this.imageObjectOurStory, element);
            }
            else if(element.row === 4){
              this.pushToObject(this.imageObjectOurMemory,element);
            }
            else{
              this.hashMapContent.set(element.row,element);
            }
        });
      })
  }

  pushToObject(object: Array<object>, element : AlbumnRequest){
    const image = {
      image: element.imageLink,
      thumbImage:element.imageLink,
     }
    object.push(image);
  }
}
