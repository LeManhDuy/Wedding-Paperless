import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AlbumnRequest } from 'src/app/models/albumn';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  personId:string='';
  state:string = 'none';
   content: Content = new Content();
  hashMapContent = new Map();
  imageObjectOurStory: Array<object> = [];
  imageObjectOurMemory: Array<object> = [];


  isLoading : boolean = false;
  /**
   *
   */
  constructor(private route:ActivatedRoute, private contentService: ContentService) {

    
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
