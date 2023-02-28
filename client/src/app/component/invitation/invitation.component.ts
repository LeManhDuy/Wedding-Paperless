import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { timer, Subscription } from 'rxjs';

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
  
  
  
  imageObjectOurStory: Array<object> = [{
    image: 'https://i.pinimg.com/564x/ea/a1/5e/eaa15e3eece5261c484fc717335550b3.jpg',
    thumbImage: 'https://i.pinimg.com/564x/ea/a1/5e/eaa15e3eece5261c484fc717335550b3.jpg',
    alt: 'alt of image',
    title: 'title of image'
}, {
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
    thumbImage: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
},
{
  image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
  thumbImage: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
  title: 'Image title', //Optional: You can use this key if want to show image with title
  alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  order: 2 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
},
{
  image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
  thumbImage: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kVWjy9SH_nurfvu9.png', // Support base64 image
  title: 'Image title', //Optional: You can use this key if want to show image with title
  alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  order: 3 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
}
];

}
