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
  selector: 'app-new-share',
  templateUrl: './new-share.component.html',
  styleUrls: ['./new-share.component.css','../form-new-template/form-new-template.component.css']
})
export class NewShareComponent {

  // @Input() reviewInDashBoard : boolean = false;
  // @Input() contentPerson: Content | undefined;
  // isLoading : boolean =false;
  // content: Content = new Content();

  // public myAngularxQrCode: string = "";
  // public qrCodeDownloadLink: SafeUrl = "";
  // hashMapContent = new Map();


  personId:string='';
  state:string = 'none';
   content: Content = new Content();
  hashMapContent = new Map();
  imageObjectOurStory: IMG[] = [];
  imageObjectOurMemory: IMG[] = [];
  isLoading : boolean = false;


  constructor(private contentService: ContentService, private router: Router,private route: ActivatedRoute, private auth: AuthService) {
  }


  ngOnInit(): void {
    const personId = this.route.snapshot.paramMap.get('id');
    this.personId = personId!;
      this.isLoading = true;
        this.contentService.getContentAttachAlbums(personId!)
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

  appearForm(){
    this.state = '';
  }

  existForm(){
    this.state = 'none';
  }
}
