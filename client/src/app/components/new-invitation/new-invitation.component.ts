import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { elements } from 'chart.js';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ContentService } from 'src/app/_services/content.service';
import { environment } from 'src/environments/environment';

class IMG {
  image?: string;
  thumbImage?: string;
}

@Component({
  selector: 'app-new-invitation',
  templateUrl: './new-invitation.component.html',
  styleUrls: ['./new-invitation.component.css','../form-new-template/form-new-template.component.css']
})
export class NewInvitationComponent {
  isLoading : boolean =false;
  content: Content = new Content();
  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: IMG[] = [];
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  hashMapContent = new Map();

  imageUrl1 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl2 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl3 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl4 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl5 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl6 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl7 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl8 : String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";


  constructor(
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private albumService: AlbumnService
  ) {
    this.myAngularxQrCode =  environment.apiURLClient + 'new-share-invitation/' + auth.getTokenId();
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
        this.contentService.getAllContents().subscribe(value => {
          value.forEach(element => {
            if (element.personId == id) {
              this.getContent(element?.id!);
            }
          })
        })
    });
  }

  getContent(id : string): void{
    this.contentService.getContent(id).subscribe(response => {
      this.content = response
      this.isLoading = true;
      this.contentService.getAlbumnsOfContent(id)
      .subscribe(respone =>{
          this.imageUrl1 = respone[0].imageLink!
          this.imageUrl2 = respone[1].imageLink!
          this.imageUrl3 = respone[2].imageLink!
          this.imageUrl4 = respone[3].imageLink!
          this.imageUrl5 = respone[4].imageLink!
          this.imageUrl6 = respone[5].imageLink!
          this.imageUrl7 = respone[6].imageLink!
          this.imageUrl8 = respone[7].imageLink!

        this.isLoading = false;
      })
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
