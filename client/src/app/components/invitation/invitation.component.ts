import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';

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

  content: Content = new Content();
  imageObjectOurStory: Array<object> = [];
  imageObjectOurMemory: Array<object> = [];

  hashMapContent = new Map();
  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.contentService.checkContentIsExistByPersonId().subscribe(value => {
        if(!value){
            this.router.navigate(['dashboard-user']);
            return;
        }
        this.getContent();

    });
  }

  getContent(): void{
      this.contentService.getContentAttachAlbums()
      .subscribe(respone =>{
        this.content = respone;
        
        this.content.albumnDtos?.forEach(element => {
            if(element.row === 2){
              this.pushToOject(this.imageObjectOurStory, element);
            }
            else if(element.row === 4){
              this.pushToOject(this.imageObjectOurMemory,element);
            }
            else{
              this.hashMapContent.set(element.row,element); 
            }
        });           
      })
  }

  pushToOject(object: Array<object>, element : AlbumnRequest){
    const image = {
      image: element.imageLink,
      thumbImage:element.imageLink,
     }
    object.push(image);
  }
}
