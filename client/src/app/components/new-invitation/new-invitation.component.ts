import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
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

  @Input() reviewInDashBoard : boolean = false;
  @Input() contentPerson: Content | undefined;
  isLoading : boolean =false;
  content: Content = new Content();
  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: IMG[] = [];
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  hashMapContent = new Map();
  constructor(private contentService: ContentService, private router: Router,private route: ActivatedRoute, private auth: AuthService) {
    this.myAngularxQrCode =  environment.apiURLClient + 'new-share-invitation/' + auth.getTokenId();
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
    this.isLoading = true;
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
        this.isLoading = false;
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
