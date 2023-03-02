import { Component, Input } from '@angular/core';
import { Albumn, AlbumnRequest } from 'src/app/models/albumn';
import { ImageInputModel } from 'src/app/models/imageInputContent';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { UploadImageService } from 'src/app/_services/upload-image.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
  @Input() imageInputModel: ImageInputModel = new ImageInputModel();
  public imageUrl : string = "";
  constructor(private album: AlbumnService, private uploadImageService: UploadImageService) {

  }
   async onFileSelected(event: any) {
    const row = Number.parseInt(this.imageInputModel.row!);
    const base64 = await this.uploadImageService.processFileToBase64(event.target);
    this.setCurrentAlbum(base64, row);
  }

  public setCurrentAlbum(base64: string, row : number ){
    const album : AlbumnRequest= {
      base64Image : base64,
      position : row,
    }

    this.uploadImageService.processConvertBase64ToUrl(base64)
    .subscribe(response =>{
      console.log(response)
        this.imageUrl = response;
    });

    switch (row){
      case 1:
        this.album.currentAlbumFirstPo = album;
        break;
      case 2:
        this.album.currentAlbumList.push(album);
        break;
      case 3:
        this.album.currentAlbumThirtPo = album;
        break;
      case 3:
        this.album.currentAlbumFourthPo = album;
        break;
    }
  }
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
